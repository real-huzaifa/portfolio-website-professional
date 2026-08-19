---
title: "Fraud detection, from imbalanced data to a live endpoint"
order: 1
outcome: "PR-AUC 0.548 against a 0.186 baseline, served from a container that has been reproduced exactly from notebook to cloud"
role: "Solo — EDA, modelling, API, container, deployment"
period: "2025"
stack: ["Python", "LightGBM", "FastAPI", "Docker", "SnapDeploy"]
repo: "https://github.com/real-huzaifa/Fraud-Detection-Api"
demo: "https://real-huzaifa.github.io/fraud-detection-demo/"
docs: "https://fraud-detection-api.containers.snapdeploy.app/docs"
figure: "pr"
metrics:
  - { value: "0.548", label: "PR-AUC, LightGBM", hl: true }
  - { value: "0.186", label: "PR-AUC, baseline" }
  - { value: "590,540", label: "Transactions" }
  - { value: "3.50%", label: "Fraud rate" }
---

## The problem

Card fraud is rare, and the rarity is the whole difficulty. In the IEEE-CIS
dataset 20,663 of 590,540 transactions are fraudulent — **3.50%**. A model that
answers "legitimate" every time scores 96.5% accuracy and catches nothing. Any
honest attempt starts by discarding accuracy as the target.

## The data

590,540 rows across 434 columns, transaction and identity tables merged. The
missingness is severe and structured: 12 columns are more than 90% empty and
214 are more than half empty, concentrated in the `id_*` identity columns. I
imputed none of it. LightGBM handles NaN natively, and whether identity data
exists at all is plausibly informative — filling it in would have destroyed a
signal to tidy up a table.

Transaction amount turned out to be a weak standalone predictor: median 75 for
fraud against 68.5 for legitimate, with heavily overlapping distributions.
Transactions above 5,000 are almost entirely legitimate.

## Decisions I made, and why

**Split on time, not at random.** `TransactionDT` spans 182 days. I trained on
the earliest 80% (472,432 rows, 3.51% fraud) and tested on the latest 20%
(118,108 rows, 3.44%), confirming the ranges do not overlap. Fraud is
adversarial and moves over time; a random split lets the model read the future
to score the past, which cannot happen in production.

**PR-AUC as the primary metric.** At a 3.5% positive rate, ROC-AUC is dominated
by the enormous negative class and looks reassuring almost regardless of what
the model does. Precision–recall only concerns the class that matters here.

**Class weighting over SMOTE.** I tested both. LightGBM with
`scale_pos_weight ≈ 27` reached 0.548; the same model with SMOTE reached 0.538.
The difference is small and sits mostly in threshold calibration rather than
underlying quality — which is exactly the argument for class weighting, since
it gets there without generating synthetic data or adding a pipeline stage.

**A threshold chosen, not inherited.** At 0.50 the model catches 65.7% of fraud
at 33.0% precision. That is a deliberate trade: a missed fraud is a direct loss,
a false alarm is recoverable friction. In a real deployment the threshold should
be set from the business's actual cost ratio rather than from a default.

## The part that was harder than modelling

Getting the thing to run somewhere was where the real failures were, and all
three were invisible at build time.

**`libgomp1`.** LightGBM needs it at runtime, and `python:3.12-slim` does not
ship it. The Docker build succeeded cleanly and the container died on startup.
Fixed with an `apt-get` line in the Dockerfile.

**Binding to `0.0.0.0`.** Uvicorn bound to `127.0.0.1` inside a container is
unreachable from outside it, port mapping notwithstanding.

**512 MB of RAM.** pandas plus LightGBM plus the model artifact was the main
deployment risk on the free tier. It fits, but that was not obvious in advance
and it is the constraint that would have forced a redesign.

## Proving it is the same model

A model that scores differently in production than in development is not
deployed, it is merely running. I validated predictions at every stage —
notebook, local API, container, cloud — against the same real test rows.
They match **to four decimal places** throughout; the standard example returns
0.4307 at every layer. The artifact bundles the model together with feature
order, categorical column list and threshold, so train/serve preprocessing
cannot drift apart.

## Known limitations

The API accepts any subset of the model's 431 features and treats the rest as
missing, which makes lightweight demo requests possible but means sparse inputs
produce low-confidence scores near the middle of the range. Full records are
where the model gives confident verdicts. The free tier also sleeps after 15
minutes idle, so the first request after a quiet period takes 10–30 seconds.

## What I would do differently

Add drift monitoring. Fraud patterns move, and a model trained on one six-month
window degrades quietly rather than loudly. A scheduled job comparing live
feature distributions against the training set is the obvious next step.
