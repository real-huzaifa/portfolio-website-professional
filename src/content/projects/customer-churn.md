---
title: "Churn prediction where recall is the business"
order: 2
outcome: "Recall 0.78 and ROC-AUC 0.84, deployed as a live Streamlit dashboard with risk tiers"
role: "Built for the Teyzix Core analytics internship (DA-INT-1)"
period: "2026"
stack: ["Python", "scikit-learn", "Streamlit", "pandas"]
repo: "https://github.com/real-huzaifa/Data-Analytics/tree/main/Customer-Churn-Prediction-Dashboard"
demo: "https://customer-churns-prediction-dashboard.streamlit.app/"
figure: "recall"
metrics:
  - { value: "0.78", label: "Recall, churn class", hl: true }
  - { value: "0.84", label: "ROC-AUC" }
  - { value: "7,043", label: "Customers" }
  - { value: "26.5%", label: "Churn rate" }
---

## The problem

A retention team can only call so many customers a week. The model's job is not
to be right in the abstract — it is to fill that call list with the people
actually about to leave. That framing decides everything downstream.

The Telco dataset holds 7,043 customers across 21 attributes, with roughly
26.5% churning. Less lopsided than fraud, but still lopsided enough that
accuracy misleads: predicting "nobody churns" scores about 73.5% and identifies
no one.

## Decisions I made, and why

**Recall over precision.** The two errors are not symmetric. A false positive
costs one unnecessary retention call. A false negative costs a customer who
walks. I optimised for recall on the churn class and accepted the extra calls,
because the business cost sits overwhelmingly on the other side. The final model
finds roughly four in five churners on unseen data.

**Logistic regression over the tree ensembles.** I compared logistic regression,
random forest and XGBoost across accuracy, precision, recall, F1 and ROC-AUC.
Logistic regression won on the two that mattered — recall 0.78 and ROC-AUC 0.84
— and it has a second advantage the ensembles do not: its coefficients say why a
customer was flagged. A retention team that can see the reason will act on the
list. An opaque model nobody trusts does not get used, which makes its accuracy
beside the point.

**Features built from behaviour, not just fields.** Tenure groups, service
counts, payment-behaviour flags and spend ratios, rather than feeding the raw
columns in and hoping.

**Risk tiers instead of bare probabilities.** The dashboard returns Low, Medium
or High rather than 0.63. Nobody working a call list wants to interpret a float,
and banding forces the threshold to be an explicit decision instead of a hidden
one.

## What I would do differently

Attach a cost matrix. Right now "recall matters more" is a stated preference.
With a real cost per retention call and an average customer lifetime value, the
threshold stops being a judgement call and becomes arithmetic. I would also add
SHAP values to the dashboard — coefficients explain the model globally, but a
retention agent wants the reason for *this* customer.
