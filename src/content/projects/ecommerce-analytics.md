---
title: "E-commerce analytics, from SQL to a decision"
order: 3
outcome: "Six business questions answered, with a significant finding on returns"
role: "Solo — SQL, statistics, dashboard, written report"
period: "2025"
stack: ["SQL", "Power BI", "Python", "SciPy"]
repo: "https://github.com/real-huzaifa/E-Commerce-Business-Analytics-Project"
figure: "signif"
metrics:
  - { value: "10,000+", label: "Orders" }
  - { value: "p < 0.001", label: "Return-rate difference", hl: true }
  - { value: "6", label: "Questions answered" }
  - { value: "4", label: "Tables joined" }
---

## The problem

A multi-table e-commerce dataset and a stakeholder who does not write SQL. The
deliverable is not a query — it is six answers someone can act on, and a
document that survives being read without me in the room.

## Decisions I made, and why

**Questions first, dashboard second.** I wrote the six questions before opening
Power BI. Dashboards built the other way round become a wall of charts that
answer nothing in particular, and every visual on this one exists because a
specific question needed it.

**Tested the return-rate difference rather than eyeballing it.** Return rates
looked uneven across product categories. Uneven-looking bars are not a finding
— sampling noise produces those routinely. A chi-square test put the difference
at **p < 0.001**, which turns "this looks off" into something a category
manager can justify acting on.

**Aggregated in SQL, not in the BI layer.** Pushing the joins and grouping into
the database kept the Power BI model small and fast, and meant the logic lived
in version-controlled files rather than inside a proprietary tool.

## What went wrong

My first revenue figures were wrong, and they were wrong in a way that looked
plausible. Joining orders to order-items before aggregating duplicated the
order-level shipping value across every line item, inflating revenue by a few
percent — small enough that nothing looked obviously broken. I caught it only
by reconciling the total against a straight sum from the orders table. I now
reconcile every aggregate against an independent count before it reaches a
chart.

## What I would do differently

Segment the return-rate finding further. Knowing that categories differ is the
start of the question, not the end — whether it is driven by sizing, by
supplier, or by a handful of SKUs is what determines what anyone does about it.
