---
title: "E-commerce analytics, from SQL to a decision"
order: 3
outcome: "Four relational tables turned into six answered business questions, a Power BI dashboard and a written report"
role: "Solo — SQL, statistical analysis, dashboard, report"
period: "2025"
stack: ["SQL", "Python", "Power BI", "pandas"]
repo: "https://github.com/real-huzaifa/E-Commerce-Business-Analytics-Project"
figure: "signif"
metrics:
  - { value: "10,000+", label: "Orders" }
  - { value: "p < 0.001", label: "Return-rate difference", hl: true }
  - { value: "6", label: "Questions answered" }
  - { value: "4", label: "Tables joined" }
---

## The problem

A relational e-commerce dataset — `customers`, `orders`, `order_items` and
`products` — and a stakeholder who does not write SQL. The deliverable is not a
query. It is six answers someone can act on, and a document that survives being
read without me in the room.

## Decisions I made, and why

**Questions first, dashboard second.** I wrote the six business questions before
opening Power BI. Dashboards built the other way round become a wall of charts
that answer nothing in particular; every visual on this one exists because a
specific question needed it. They cover revenue and profit, channel
performance, top products and categories, and customer segments.

**Aggregation pushed into SQL.** The joins across the four tables and the
grouping happen in `SQL Queries.sql`, not in the BI layer. That keeps the Power
BI model small and fast, and it keeps the business logic in a version-controlled
text file rather than locked inside a proprietary tool where nobody can review
it.

**I tested the return-rate difference instead of eyeballing it.** Return rates
looked uneven across product categories. Uneven-looking bars are not a finding —
sampling noise produces those routinely. A chi-square test of independence put
the difference at **p < 0.001**, which is what turns "this looks off" into
something a category manager can justify acting on. The statistical work sits in
a separate notebook so the reasoning is inspectable rather than buried in a
dashboard tooltip.

**Three artifacts, not one.** The repository ships the interactive `.pbix`, a
static PDF export for anyone without Power BI Desktop, and a written report
summarising the findings. A dashboard that only opens in one application on one
person's laptop is not a deliverable.

## What I would do differently

Segment the return-rate finding further. Knowing that categories differ is the
start of the question, not the end — whether it is driven by sizing, by
supplier, or by a handful of individual SKUs is what determines what anyone
actually does about it. I would also add a data-quality check reconciling
aggregate revenue against an independent count from the orders table, since
fan-out on a one-to-many join is the easiest way to inflate a total without
anything looking obviously wrong.
