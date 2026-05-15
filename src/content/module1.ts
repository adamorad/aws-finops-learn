import type { Module } from "../types/content";

export const module1: Module = {
  id: "1",
  title: "FinOps Fundamentals Pt. 1",
  subtitle: "Migration, Forecasting & Governance",
  description:
    "Master the foundations of cloud financial management: understand the FinOps lifecycle, build migration business cases, forecast cloud spend, configure AWS Budgets, and establish cost governance frameworks.",
  icon: "BarChart2",
  sections: [
    {
      id: "intro",
      title: "Introduction to FinOps",
      estimatedMinutes: 10,
      blocks: [
        {
          type: "heading",
          level: 2,
          text: "What is FinOps?",
        },
        {
          type: "paragraph",
          text: "FinOps (Cloud Financial Operations) is a cultural practice and operational framework that brings financial accountability to the variable spend model of cloud. It unites finance, engineering, and business teams to make informed, real-time decisions about cloud spending. The FinOps Foundation defines it as: *the practice of bringing financial accountability to the variable spend model of cloud, enabling distributed teams to make business trade-offs between speed, cost, and quality.*",
        },
        {
          type: "callout",
          variant: "info",
          title: "FinOps is not just about cutting costs",
          text: "FinOps helps organizations maximize business value from cloud investment. Sometimes that means spending more in areas that drive revenue — such as scaling EC2 capacity ahead of a product launch — while aggressively optimizing waste in dev and staging environments.",
        },
        {
          type: "heading",
          level: 2,
          text: "The Three FinOps Phases",
        },
        {
          type: "paragraph",
          text: "Every organization moves through three iterative phases: **Inform**, **Optimize**, and **Operate**. These are not linear stages — mature teams run all three simultaneously, applying deeper practices as they gain experience. A startup might be in Crawl/Inform while a Fortune 500 enterprise runs automated optimization in near real-time.",
        },
        {
          type: "table",
          headers: ["Phase", "Goal", "Key Activities", "Typical Outcome"],
          rows: [
            [
              "Inform",
              "Visibility & allocation",
              "Cost allocation tags, dashboards, anomaly detection, showback reports",
              "Teams see what they spend; untagged resources < 10%",
            ],
            [
              "Optimize",
              "Reduce waste & improve efficiency",
              "Right-sizing, Reserved Instances, Savings Plans, Spot adoption",
              "20-40% cost reduction vs. unoptimized On-Demand baseline",
            ],
            [
              "Operate",
              "Continuous improvement",
              "FinOps team rituals, automation, unit economics, KPI tracking",
              "Engineering teams own cost as a feature; forecasts within ±5%",
            ],
          ],
        },
        {
          type: "heading",
          level: 2,
          text: "Core FinOps Principles",
        },
        {
          type: "bullet-list",
          items: [
            "**Teams need to collaborate** — Finance, Engineering, and Business must share a common language around cloud cost",
            "**Everyone takes ownership** — the team that provisions the resource is accountable for its cost",
            "**A central FinOps team enables, not dictates** — the practice succeeds through influence, tooling, and education",
            "**FinOps data must be timely** — near real-time cost data beats monthly batch reports; anomalies caught in hours cost less than anomalies caught in weeks",
            "**Decisions are driven by business value** — a $50,000/month ML pipeline is cheap if it generates $5M in revenue",
            "**Embrace the variable model** — auto-scaling, serverless, and Spot capacity let you pay for exactly what you use",
          ],
        },
        {
          type: "heading",
          level: 2,
          text: "FinOps Maturity: Crawl, Walk, Run",
        },
        {
          type: "paragraph",
          text: "The FinOps Foundation describes organizational maturity as a **Crawl / Walk / Run** spectrum. Most cloud adopters start at Crawl — basic tagging, simple Cost Explorer dashboards, and manual monthly reviews. At Walk, teams implement showback reports and begin purchasing Savings Plans. At Run, cost optimization is automated, unit economics are tracked per business metric, and engineering teams get daily spend alerts.",
        },
        {
          type: "callout",
          variant: "tip",
          title: "Start with Inform, not Optimize",
          text: "Resist the urge to immediately buy Reserved Instances or Savings Plans before you have visibility. Organizations that purchase commitments without understanding their baseline spend often over-commit and end up with unused reservations. Spend 30-60 days in Inform mode first.",
        },
        {
          type: "heading",
          level: 2,
          text: "Real-World FinOps Trigger Events",
        },
        {
          type: "bullet-list",
          items: [
            "AWS bill exceeds $100K/month and no one can explain the top cost drivers",
            "Finance asks engineering for a Q3 cloud forecast and engineers have no answer",
            "A developer accidentally leaves a `p3.8xlarge` GPU instance running over a long weekend — $1,400 wasted",
            "The company prepares for an IPO and investors ask about cloud unit economics",
            "A merger brings two cloud environments together and costs need reconciliation",
          ],
        },
      ],
      flashcards: [
        {
          id: "m1-intro-01",
          moduleId: "1",
          front: "What are the three phases of the FinOps lifecycle?",
          back: "Inform (gain visibility and allocate costs), Optimize (reduce waste using commitments and right-sizing), and Operate (continuous improvement through automation and KPIs). Organizations run all three simultaneously at maturity.",
          tags: ["finops", "lifecycle", "phases"],
        },
        {
          id: "m1-intro-02",
          moduleId: "1",
          front: "What is the primary goal of FinOps?",
          back: "To bring financial accountability to variable cloud spend by uniting finance, engineering, and business teams to maximize business value from cloud investment — not simply to cut costs.",
          tags: ["finops", "definition"],
        },
        {
          id: "m1-intro-03",
          moduleId: "1",
          front: "What does the FinOps Maturity Model describe?",
          back: "Three maturity stages: Crawl (basic tagging and visibility), Walk (some optimization and showback), and Run (full automation, real-time decisions, and unit economics). Most enterprises begin at Crawl.",
          tags: ["finops", "maturity"],
        },
        {
          id: "m1-intro-04",
          moduleId: "1",
          front: "Why is near-real-time cost data critical in FinOps?",
          back: "Cloud spend can spike rapidly. A misconfigured Auto Scaling policy or a forgotten GPU instance can generate thousands of dollars in hours. Near-real-time data enables anomaly detection before costs compound, unlike monthly batch reporting which arrives weeks after the damage is done.",
          tags: ["finops", "visibility", "data"],
        },
        {
          id: "m1-intro-05",
          moduleId: "1",
          front:
            "Why should an organization spend 30-60 days in the Inform phase before buying Reserved Instances?",
          back: "Without baseline visibility, organizations over-commit and end up with unused reservations that still incur charges. Understanding actual usage patterns first ensures commitments align with real workload needs.",
          tags: ["finops", "reserved-instances", "maturity"],
        },
      ],
    },
    {
      id: "personas",
      title: "FinOps Personas & Team Structures",
      estimatedMinutes: 8,
      blocks: [
        {
          type: "heading",
          level: 2,
          text: "Why FinOps Requires Multiple Personas",
        },
        {
          type: "paragraph",
          text: "Cloud financial management fails when it lives in a single silo. Finance teams see invoices but cannot change infrastructure. Engineers can optimize code but often lack budget context. FinOps works by creating shared language and shared accountability across all three groups — finance, engineering, and executive leadership.",
        },
        {
          type: "heading",
          level: 2,
          text: "The FinOps Practitioner",
        },
        {
          type: "paragraph",
          text: "The **FinOps Practitioner** (sometimes called a Cloud Financial Analyst or Cloud Economist) is the central coordinator. This person builds Cost Explorer dashboards, manages Savings Plans and RI portfolios, creates chargeback reports, and educates engineering teams. At smaller companies, this role may be a part-time responsibility of a DevOps or finance engineer. At scale, organizations have dedicated FinOps teams of 3-10 people.",
        },
        {
          type: "callout",
          variant: "info",
          title: "FinOps Foundation Certification",
          text: "The FinOps Foundation offers the **FinOps Certified Practitioner (FOCP)** certification — the industry-standard credential for cloud financial management professionals. It covers all three lifecycle phases, FinOps vocabulary, and persona responsibilities.",
        },
        {
          type: "heading",
          level: 2,
          text: "Engineering Persona",
        },
        {
          type: "paragraph",
          text: "Engineers are the primary **spenders** in a cloud environment — every `terraform apply` or CloudFormation deployment creates cost. The FinOps-aware engineer understands the cost implications of architectural decisions: choosing `gp3` over `gp2` for EBS volumes saves 20%, selecting Graviton3 instances provides 20% better price-performance than x86, and enabling S3 Intelligent-Tiering can cut storage costs by 40-68% for infrequently accessed objects.",
        },
        {
          type: "table",
          headers: [
            "Engineering Decision",
            "Cost-Unaware Choice",
            "Cost-Aware Choice",
            "Savings",
          ],
          rows: [
            [
              "EBS volume type",
              "gp2 at $0.10/GB-month",
              "gp3 at $0.08/GB-month",
              "20%",
            ],
            [
              "EC2 processor",
              "m5.xlarge (x86)",
              "m7g.xlarge (Graviton3)",
              "~20% price-performance",
            ],
            [
              "EC2 scheduling",
              "24/7 On-Demand",
              "Stop dev instances nights/weekends",
              "65% savings",
            ],
            [
              "S3 storage class",
              "Standard for all objects",
              "Intelligent-Tiering for infrequent access",
              "40-68%",
            ],
            [
              "Lambda memory",
              "Default 128 MB",
              "Tuned with Power Tuning tool",
              "Varies; often 20-40%",
            ],
          ],
        },
        {
          type: "heading",
          level: 2,
          text: "Finance Persona",
        },
        {
          type: "paragraph",
          text: "Finance teams need cloud cost data in terms they recognize: monthly actuals, budget variance, annual forecasts, and cost center allocations. Their job is to set cloud budgets, reconcile AWS invoices against internal cost center codes, and explain variances to leadership. The challenge is translating AWS billing concepts (instance-hours, data transfer, request counts) into financial language (OPEX, CAPEX, COGS).",
        },
        {
          type: "bullet-list",
          items: [
            "AWS Reserved Instance upfront payments are **capital expenditures (CAPEX)** in most accounting frameworks",
            "On-Demand and Savings Plans charges are **operational expenditures (OPEX)**",
            "**Amortized costs** in Cost Explorer spread RI/SP upfront fees across the commitment period for smoother OPEX reporting",
            "AWS sends a **consolidated invoice** to the management account; finance teams use CUR to break this down by linked account",
            "Some companies capitalize cloud costs for internal software development under **ASC 350-40** accounting standards",
          ],
        },
        {
          type: "heading",
          level: 2,
          text: "Executive Persona",
        },
        {
          type: "paragraph",
          text: "Executives care about cloud **as a business investment**, not as a line item. The questions they ask: Is our cloud spend growing in proportion to revenue? What is our cost per customer? Are we getting the ROI we projected in the migration business case? A FinOps team that can answer these questions in executive-level dashboards earns organizational trust and budget.",
        },
        {
          type: "callout",
          variant: "tip",
          title: "Executive KPIs to Track",
          text: "Cloud cost as a % of revenue, cost per active user, cost per transaction, forecasted vs. actual variance, and Savings Plans/RI coverage rate. These metrics connect cloud spend to business outcomes and enable informed trade-off decisions at the leadership level.",
        },
      ],
      flashcards: [
        {
          id: "m1-personas-01",
          moduleId: "1",
          front: "What is the role of a FinOps Practitioner?",
          back: "The central coordinator who builds cost dashboards, manages Savings Plans and RI portfolios, creates chargeback reports, and educates engineering teams on cost-efficient architecture. They translate between finance and engineering languages.",
          tags: ["finops", "personas", "practitioner"],
        },
        {
          id: "m1-personas-02",
          moduleId: "1",
          front:
            "How does gp3 compare to gp2 for EBS volumes in terms of pricing?",
          back: "gp3 costs $0.08/GB-month vs. gp2 at $0.10/GB-month — a 20% savings. gp3 also provides higher baseline IOPS (3,000) and throughput (125 MB/s) configurable independently of storage size, without extra cost.",
          tags: ["ebs", "gp3", "gp2", "engineering", "pricing"],
        },
        {
          id: "m1-personas-03",
          moduleId: "1",
          front:
            "What is the difference between amortized and unblended costs in AWS billing?",
          back: "Unblended costs show actual charges as they appear (e.g., a large upfront RI payment in January). Amortized costs spread that upfront fee evenly across the commitment period, giving a smoother monthly view preferred by finance teams for OPEX reporting.",
          tags: ["finance", "amortized", "unblended", "reserved-instances"],
        },
        {
          id: "m1-personas-04",
          moduleId: "1",
          front:
            "What executive-level KPIs connect cloud spend to business outcomes?",
          back: "Cloud cost as % of revenue, cost per active user, cost per transaction, Savings Plans/RI coverage rate, and forecasted vs. actual variance. These translate infrastructure spend into business language.",
          tags: ["executive", "kpi", "unit-economics"],
        },
      ],
    },
    {
      id: "migration-biz-case",
      title: "Migration Business Cases & TCO",
      estimatedMinutes: 12,
      blocks: [
        {
          type: "heading",
          level: 2,
          text: "Building a Cloud Migration Business Case",
        },
        {
          type: "paragraph",
          text: "A migration business case quantifies the financial and strategic value of moving workloads to AWS. It compares the **Total Cost of Ownership (TCO)** of on-premises infrastructure against projected AWS costs, and captures non-cost benefits like agility, reduced operational burden, and faster innovation. A well-built business case is the difference between a migration that gets funded and one that stalls in procurement.",
        },
        {
          type: "heading",
          level: 2,
          text: "Total Cost of Ownership (TCO): What Organizations Miss",
        },
        {
          type: "paragraph",
          text: "On-premises TCO includes costs that are frequently under-attributed or hidden in shared infrastructure budgets. A typical mid-market company running 200 physical servers often underestimates its true data center cost by 30-50% because power, cooling, floor space, and hardware refresh cycles are buried in facilities budgets rather than IT budgets.",
        },
        {
          type: "table",
          headers: [
            "Cost Category",
            "On-Premises Reality",
            "AWS Cloud Equivalent",
          ],
          rows: [
            [
              "Compute (servers)",
              "3-year capex cycle; $15K-$50K per server; often 10-20% avg utilization",
              "EC2 On-Demand, Savings Plans, or Spot; pay for actual utilization",
            ],
            [
              "Storage",
              "SAN/NAS capex + annual maintenance (15-20% of purchase price)",
              "S3 at $0.023/GB-month; EBS gp3 at $0.08/GB-month; EFS at $0.30/GB-month",
            ],
            [
              "Networking",
              "Core/edge switches, WAN circuits ($5K-$50K/month), hardware refresh",
              "VPC networking (free); data transfer $0.09/GB out to internet",
            ],
            [
              "Facilities",
              "Power (avg $0.10/kWh), cooling (40-50% overhead), colocation fees",
              "Included in AWS pricing; AWS PUE ~1.2 vs. industry avg 1.5-1.6",
            ],
            [
              "Labor",
              "1 FTE per 50-100 servers; $100K-$150K fully-loaded cost per ops engineer",
              "Managed services shift labor to higher-value work; fewer ops FTEs needed",
            ],
            [
              "Software licensing",
              "Per-socket Oracle DB: $47.5K/socket; Windows Server: $6.2K/core",
              "License-included RDS Oracle or SQL Server; AWS License Manager for BYOL",
            ],
          ],
        },
        {
          type: "heading",
          level: 2,
          text: "AWS Migration Evaluator",
        },
        {
          type: "paragraph",
          text: "**AWS Migration Evaluator** (formerly TSO Logic) is the primary tool for large-scale business case development. It accepts utilization data from on-premises discovery agents or manual import files, then produces a rightsized AWS cost estimate — using actual CPU/memory metrics rather than peak provisioned capacity. A business case generated by Migration Evaluator carries significantly more credibility with executives than a back-of-envelope estimate.",
        },
        {
          type: "callout",
          variant: "important",
          title: "Migration Evaluator vs. AWS Pricing Calculator",
          text: "Migration Evaluator uses actual on-premises utilization data for rightsized estimates. AWS Pricing Calculator (calculator.aws) requires you to manually specify instance types and quantities. Use Migration Evaluator for large-scale fleet assessments and Pricing Calculator for targeted per-service estimates (e.g., 'how much will my new data pipeline cost on Glue?').",
        },
        {
          type: "heading",
          level: 2,
          text: "Rightsizing Assumption: The Most Common Mistake",
        },
        {
          type: "paragraph",
          text: "A startup running 50 `m5.xlarge` instances 24/7 at 15% average CPU utilization is paying $4,320/month On-Demand. Rightsized to `m5.large` instances (50% smaller) and scheduled to stop during nights and weekends (65% runtime reduction), that same workload costs approximately $756/month — an 83% reduction. Business cases that assume 100% utilization or peak provisioned capacity dramatically overstate AWS costs.",
        },
        {
          type: "callout",
          variant: "tip",
          title: "Rightsizing Rule of Thumb",
          text: "On-premises servers average 10-20% CPU utilization. AWS estimates should assume 60-70% utilization after rightsizing — reflecting the efficiency achievable by matching instance size to actual demand. This prevents inflating the cloud cost side of your business case.",
        },
        {
          type: "heading",
          level: 2,
          text: "Business Case Components",
        },
        {
          type: "numbered-list",
          items: [
            "**Current state cost inventory**: document all on-premises costs across compute, storage, network, labor, and facilities — use a 3-year view to match depreciation cycles",
            "**AWS future state estimate**: run Migration Evaluator or Pricing Calculator with rightsized assumptions at target utilization",
            "**Migration cost estimate**: one-time costs including tooling (CloudEndure, AWS MGN), consulting, retraining, application refactoring, and parallel-run periods",
            "**NPV and payback period**: factor migration costs into a 3-5 year NPV model; most migrations break even in 12-18 months",
            "**Non-financial benefits**: faster time-to-market, global reach via AWS regions, improved security posture (shared responsibility), compliance certifications (ISO, SOC2, PCI-DSS included in AWS)",
          ],
        },
        {
          type: "heading",
          level: 2,
          text: "The 7 Rs of Migration",
        },
        {
          type: "paragraph",
          text: "AWS describes seven migration strategies — the **7 Rs** — each with different cost implications. The strategy chosen for a given workload dramatically affects both migration cost and post-migration cloud spend.",
        },
        {
          type: "bullet-list",
          items: [
            "**Retire**: decommission — 10-20% of legacy portfolios qualify; immediate savings",
            "**Retain**: keep on-premises; appropriate for workloads with regulatory or latency constraints",
            "**Rehost (Lift & Shift)**: move as-is to EC2; fastest and cheapest to migrate but misses cloud-native savings",
            "**Relocate**: move to AWS using VMware Cloud on AWS or container-level lift & shift",
            "**Repurchase**: replace legacy app with SaaS (e.g., move on-prem CRM to Salesforce)",
            "**Replatform**: minor cloud optimizations (e.g., move MySQL on EC2 to Amazon RDS); medium effort, meaningful savings",
            "**Refactor/Re-architect**: redesign for cloud-native services (EKS, Lambda, DynamoDB); highest effort, highest long-term ROI",
          ],
        },
      ],
      flashcards: [
        {
          id: "m1-migration-biz-case-01",
          moduleId: "1",
          front:
            "What is AWS Migration Evaluator and how does it differ from AWS Pricing Calculator?",
          back: "Migration Evaluator ingests actual on-premises utilization data (from agents or imports) to produce rightsized AWS estimates automatically. Pricing Calculator requires manual specification of instance types and quantities. Migration Evaluator is better for large-scale fleet assessments; Pricing Calculator is better for targeted new workload estimates.",
          tags: [
            "migration",
            "tools",
            "pricing-calculator",
            "migration-evaluator",
          ],
        },
        {
          id: "m1-migration-biz-case-02",
          moduleId: "1",
          front:
            "What hidden costs are often excluded from on-premises TCO analysis?",
          back: "Data center facilities (power at ~$0.10/kWh, cooling at 40-50% overhead, floor space), hardware refresh cycles (every 3-5 years), network equipment and WAN circuits, software licensing overhead, and labor costs (~1 FTE per 50-100 servers at $100K-$150K fully-loaded).",
          tags: ["tco", "migration", "on-premises"],
        },
        {
          id: "m1-migration-biz-case-03",
          moduleId: "1",
          front:
            "A company runs 50 m5.xlarge instances at 15% avg CPU. What rightsizing steps could reduce costs by ~83%?",
          back: "Rightsize to m5.large (50% smaller, matching actual utilization), then schedule instances to stop nights and weekends (65% runtime reduction). The $4,320/month On-Demand bill drops to approximately $756/month.",
          tags: ["rightsizing", "migration", "ec2", "cost-optimization"],
        },
        {
          id: "m1-migration-biz-case-04",
          moduleId: "1",
          front:
            "What are the 7 Rs of cloud migration and which has the highest long-term ROI?",
          back: "Retire, Retain, Rehost, Relocate, Repurchase, Replatform, and Refactor/Re-architect. Refactoring (redesigning for cloud-native services like EKS, Lambda, DynamoDB) has the highest long-term ROI but the highest upfront cost and effort.",
          tags: ["migration", "7rs", "business-case"],
        },
        {
          id: "m1-migration-biz-case-05",
          moduleId: "1",
          front:
            "What is the typical payback period for a cloud migration, and what financial model is used?",
          back: "Most migrations break even in 12-18 months. A 3-5 year Net Present Value (NPV) model is standard, factoring in one-time migration costs (tooling, consulting, retraining) against ongoing savings from rightsizing, reduced labor, and no hardware refresh cycles.",
          tags: ["migration", "npv", "payback", "business-case"],
        },
      ],
    },
    {
      id: "forecasting",
      title: "Cloud Forecasting Techniques",
      estimatedMinutes: 12,
      blocks: [
        {
          type: "heading",
          level: 2,
          text: "Why Cloud Forecasting is Fundamentally Different",
        },
        {
          type: "paragraph",
          text: "Cloud spend is inherently variable — it responds to traffic spikes, new feature launches, team growth, seasonal demand, and architectural changes. A company that migrates from on-premises capex to cloud OPEX often discovers that finance teams are unprepared for this variability. A single misconfigured Auto Scaling group can double an AWS bill overnight. Accurate forecasting requires combining historical trends with business context.",
        },
        {
          type: "callout",
          variant: "warning",
          title: "The 'Last Month +10%' Trap",
          text: "Many FinOps teams forecast cloud costs as 'last month's bill plus 10%.' This fails when a major product launch, data migration, or architectural change creates a step-change in spend. Always incorporate business events into your forecast model.",
        },
        {
          type: "heading",
          level: 2,
          text: "Forecasting Methods Compared",
        },
        {
          type: "table",
          headers: ["Method", "Description", "Best For", "Accuracy"],
          rows: [
            [
              "Trend-based",
              "Extrapolate from historical spend using growth rates or moving averages",
              "Stable workloads with predictable, steady growth",
              "High for stable workloads; poor for new services",
            ],
            [
              "Driver-based",
              "Link cloud spend to business metrics (users, transactions, API calls/revenue)",
              "SaaS products with clear unit economics",
              "High when drivers are well-understood",
            ],
            [
              "Bottom-up",
              "Sum individual team or workload forecasts",
              "Organizations with mature tagging and allocation",
              "High accuracy but high effort; requires team buy-in",
            ],
            [
              "Top-down",
              "Apply budget envelope and distribute across teams",
              "Early-stage FinOps, new fiscal year planning",
              "Low; misses team-level dynamics",
            ],
            [
              "ML-based (Cost Explorer)",
              "AWS machine learning trained on your usage history",
              "Any account with 60+ days of history",
              "±10-15% for stable workloads",
            ],
          ],
        },
        {
          type: "heading",
          level: 2,
          text: "AWS Cost Explorer Forecasting",
        },
        {
          type: "paragraph",
          text: "AWS Cost Explorer includes a built-in forecasting feature using **machine learning** trained on your historical usage. It generates forecasts up to **12 months** into the future with confidence intervals (typically shown as a range). Forecasts are available at the account, service, linked account, and tag level. For example, you can forecast costs for only your `team:data-engineering` tagged resources for the next 6 months.",
        },
        {
          type: "callout",
          variant: "info",
          title: "Cost Explorer Forecast Data Requirements",
          text: "Cost Explorer requires at least 7 days of historical cost data to generate any forecast, but at least 60 days is recommended for meaningful accuracy. Accounts with highly seasonal or irregular spend patterns will see wider confidence intervals. New AWS accounts should use bottom-up or driver-based forecasting until sufficient history accumulates.",
        },
        {
          type: "heading",
          level: 2,
          text: "Driver-Based Forecasting in Practice",
        },
        {
          type: "paragraph",
          text: "Driver-based forecasting connects cloud cost to business metrics, making spend transparent to non-technical stakeholders. If your SaaS product costs $0.50 per active user per month in AWS infrastructure, and the marketing team projects 40,000 new users next quarter, you can add $20,000/month to your cloud forecast — and hold that cost accountable against user acquisition targets.",
        },
        {
          type: "numbered-list",
          items: [
            "Identify your primary cost driver (active users, API calls, GB processed, transactions)",
            "Calculate your current cost per unit from Cost Explorer actuals divided by the driver metric",
            "Get business projections for the driver metric from product or marketing teams",
            "Multiply unit cost by projected driver volume to get the forecast",
            "Add a margin for new features, experiments, and unplanned usage (typically 10-20%)",
            "Reconcile quarterly and recalibrate the unit cost as architecture and pricing changes",
          ],
        },
        {
          type: "heading",
          level: 2,
          text: "Budget vs. Actuals Tracking",
        },
        {
          type: "paragraph",
          text: "Tracking **budget vs. actuals** is the core FinOps feedback loop. Finance teams set annual cloud budgets; FinOps teams track actual AWS spend weekly or monthly and report on variance. A ±10-15% variance from forecast typically triggers a review. Larger variances require a root cause analysis: did a new service launch unexpectedly? Did data transfer spike due to a bug? Did a team forget to delete a dev environment?",
        },
        {
          type: "callout",
          variant: "tip",
          title: "Reforecast Quarterly",
          text: "Annual forecasts become stale quickly in cloud. Reforecast at least quarterly using updated business drivers — headcount changes, new product lines, go-to-market timelines, and infrastructure architecture decisions. Some mature FinOps teams reforecast monthly.",
        },
      ],
      flashcards: [
        {
          id: "m1-forecasting-01",
          moduleId: "1",
          front:
            "What is driver-based forecasting and why is it preferred for SaaS products?",
          back: "Driver-based forecasting links cloud spend to a business metric (e.g., cost per active user at $0.50/user/month). When the marketing team projects 40,000 new users, FinOps can add $20,000/month to the forecast. It connects engineering spend to business outcomes and is transparent to non-technical stakeholders.",
          tags: ["forecasting", "driver-based", "unit-economics"],
        },
        {
          id: "m1-forecasting-02",
          moduleId: "1",
          front:
            "How far into the future can AWS Cost Explorer forecast, and how much history is needed?",
          back: "Up to 12 months into the future. Minimum 7 days of history to generate any forecast, but 60+ days recommended for meaningful accuracy. It uses ML with confidence intervals. New accounts should use bottom-up or driver-based forecasting until sufficient history accumulates.",
          tags: ["cost-explorer", "forecasting", "aws"],
        },
        {
          id: "m1-forecasting-03",
          moduleId: "1",
          front: "What is the 'Last Month +10%' trap in cloud forecasting?",
          back: "Forecasting next month's cloud bill as last month's spend plus a flat growth percentage fails to account for step-changes caused by product launches, data migrations, architectural changes, or seasonal spikes. Business events must be incorporated into the forecast model.",
          tags: ["forecasting", "common-mistakes"],
        },
        {
          id: "m1-forecasting-04",
          moduleId: "1",
          front:
            "What variance percentage typically triggers a budget review, and what are common root causes?",
          back: "A variance of more than ±10-15% between actual and forecasted spend triggers a formal review. Common root causes: unexpected new service adoption, data transfer spikes from bugs, forgotten dev environments, missing Savings Plans coverage, or new team provisioning without budget update.",
          tags: ["budgeting", "variance", "governance"],
        },
        {
          id: "m1-forecasting-05",
          moduleId: "1",
          front:
            "How does bottom-up forecasting differ from top-down forecasting?",
          back: "Bottom-up aggregates forecasts from individual teams or workloads (high accuracy, high effort, requires mature tagging). Top-down applies a budget envelope distributed across teams (low effort, lower accuracy, used early in FinOps maturity or for new fiscal years).",
          tags: ["forecasting", "methods", "bottom-up", "top-down"],
        },
      ],
    },
    {
      id: "budgeting",
      title: "Budgeting with AWS Budgets",
      estimatedMinutes: 12,
      blocks: [
        {
          type: "heading",
          level: 2,
          text: "AWS Budgets Overview",
        },
        {
          type: "paragraph",
          text: "AWS Budgets lets you set custom cost and usage budgets and receive alerts when you approach or exceed thresholds. Budgets can be scoped to an entire account, linked account, specific AWS service, tag, cost category, or purchase option. Crucially, budgets also support **Budget Actions** — automated responses that take effect when a threshold is crossed, without requiring human intervention.",
        },
        {
          type: "heading",
          level: 2,
          text: "Types of AWS Budgets",
        },
        {
          type: "table",
          headers: [
            "Budget Type",
            "Tracks",
            "Example Use Case",
            "Alert Metric",
          ],
          rows: [
            [
              "Cost Budget",
              "Dollar spend (actual or forecasted)",
              "Monthly AWS spend per account or business unit; alert at $8,000 on a $10,000 budget",
              "$USD",
            ],
            [
              "Usage Budget",
              "Service units (EC2 hours, S3 GB, Lambda invocations)",
              "Track compute hours consumed; useful when unit price changes but consumption should be constant",
              "Units (e.g., instance-hours, GB)",
            ],
            [
              "Savings Plans Budget",
              "Savings Plans utilization or coverage %",
              "Alert when SP utilization drops below 80% — indicates you're paying for unused commitments",
              "% utilization or % coverage",
            ],
            [
              "Reservation Budget",
              "Reserved Instance utilization or coverage %",
              "Monitor RI portfolio; alert when EC2 RI coverage falls below 70% for production accounts",
              "% utilization or % coverage",
            ],
          ],
        },
        {
          type: "heading",
          level: 2,
          text: "Budget Alert Configuration",
        },
        {
          type: "paragraph",
          text: "Each budget supports up to **10 alert thresholds**. Alerts fire on **actual** spend (charges already incurred) or **forecasted** spend (Cost Explorer ML prediction for the rest of the period). Notifications are delivered via **Amazon SNS** (which can fan out to email, Slack via Lambda, PagerDuty, etc.) or directly to up to 10 email addresses. Best practice is to configure both actual and forecasted alerts at multiple thresholds: 50%, 80%, and 100%.",
        },
        {
          type: "callout",
          variant: "warning",
          title: "Actual vs. Forecasted Alerts: Critical Difference",
          text: "An actual alert at 80% means you have ALREADY spent 80% of your budget. A forecasted alert at 80% means Cost Explorer predicts you WILL reach 80% by month end — giving you days or weeks of advance warning to act. Always set forecasted alerts earlier than actual alerts for proactive management.",
        },
        {
          type: "heading",
          level: 2,
          text: "Budget Actions: Automated Cost Controls",
        },
        {
          type: "paragraph",
          text: "**Budget Actions** automate responses when a threshold is breached. This is the enforcement layer of AWS Budgets — not just alerting, but taking action. Three action types are available: apply an IAM policy, attach a Service Control Policy (SCP) to an AWS Organizations OU, or stop/terminate EC2 or RDS instances. Actions can run automatically or require manual approval (requiring a second human to confirm).",
        },
        {
          type: "bullet-list",
          items: [
            "**IAM policy action**: apply a `DenyEC2Launch` policy when a dev account exceeds $500/month — engineers cannot provision new EC2 instances until the budget resets",
            "**SCP action**: attach a restrictive SCP to an OU when the business unit exceeds its $20,000/month budget",
            "**EC2/RDS stop**: automatically stop all non-production instances when the account hits its budget threshold",
            "Actions require an IAM role granting AWS Budgets permission to execute — a common misconfiguration to verify",
            "Actions are fully auditable via **AWS CloudTrail** — every automated action creates a log entry",
            "Budget Actions do NOT retroactively reverse charges — they prevent FUTURE spend, not charges already accrued",
          ],
        },
        {
          type: "heading",
          level: 2,
          text: "Zero-Spend and Free Tier Budgets",
        },
        {
          type: "paragraph",
          text: "A **zero-spend budget** alerts the moment any charges appear in an account — useful for sandbox and test accounts where billing should never occur. AWS Budgets also provides a pre-configured **AWS Free Tier budget** template that tracks your Free Tier usage across all eligible services and alerts before you exceed the monthly free limits.",
        },
        {
          type: "callout",
          variant: "tip",
          title: "Multi-Account Budget Strategy",
          text: "In AWS Organizations, set budgets at both the management account level (total organization spend) and at the linked account level (per-team or per-product budgets). This creates a two-layer alert system: account-level alerts catch team overruns early, while the organization-level budget is the financial backstop.",
        },
      ],
      flashcards: [
        {
          id: "m1-budgeting-01",
          moduleId: "1",
          front:
            "What are the four types of AWS Budgets and what does each track?",
          back: "Cost Budget (dollar spend), Usage Budget (service units like EC2 hours or S3 GB), Savings Plans Budget (SP utilization or coverage %), and Reservation Budget (RI utilization or coverage %). Cost and usage budgets support actual and forecasted alerts; SP/RI budgets track commitment efficiency.",
          tags: ["aws-budgets", "budget-types"],
        },
        {
          id: "m1-budgeting-02",
          moduleId: "1",
          front:
            "Why should you configure forecasted budget alerts at lower thresholds than actual alerts?",
          back: "A forecasted alert at 80% warns you days or weeks before you hit the threshold, giving time to act. An actual alert at 80% means you've already spent 80% of the budget. Setting a forecasted alert at 70% and actual at 90% gives maximum advance warning.",
          tags: ["aws-budgets", "alerts", "forecasted"],
        },
        {
          id: "m1-budgeting-03",
          moduleId: "1",
          front: "What three action types does AWS Budget Actions support?",
          back: "1) Apply an IAM policy to an IAM user, group, or role, 2) Attach a Service Control Policy (SCP) to an AWS Organizations OU, 3) Stop or terminate targeted EC2 or RDS instances. All actions require an IAM role granting Budget Actions the necessary permissions.",
          tags: ["aws-budgets", "budget-actions", "automation"],
        },
        {
          id: "m1-budgeting-04",
          moduleId: "1",
          front: "What is a zero-spend budget and when should you use it?",
          back: "A zero-spend budget alerts the moment any charges appear in an account — even $0.01. Use it for sandbox and test accounts where no billing should ever occur. It catches accidental resource creation or forgotten infrastructure immediately.",
          tags: ["aws-budgets", "zero-spend", "sandbox"],
        },
        {
          id: "m1-budgeting-05",
          moduleId: "1",
          front:
            "Does an AWS Budget Action reverse charges that have already been incurred?",
          back: "No. Budget Actions prevent FUTURE spend only. A DenyEC2Launch policy applied after $500 is spent does not refund the $500 already charged. Actions must be set at early enough thresholds to prevent significant overspend.",
          tags: ["aws-budgets", "budget-actions", "limitations"],
        },
      ],
    },
    {
      id: "cost-reporting",
      title: "Cost Reporting & Visualization",
      estimatedMinutes: 12,
      blocks: [
        {
          type: "heading",
          level: 2,
          text: "The AWS Cost Reporting Ecosystem",
        },
        {
          type: "paragraph",
          text: "AWS provides a layered set of reporting tools, from simple dashboards to raw line-item data exports. Understanding which tool to use for which purpose prevents both under-analysis (missing critical spend drivers) and over-engineering (building custom pipelines for data that Cost Explorer already shows). The three primary tools are **AWS Cost Explorer**, the **AWS Cost and Usage Report (CUR)**, and **AWS QuickSight** for custom BI dashboards.",
        },
        {
          type: "heading",
          level: 2,
          text: "AWS Cost Explorer",
        },
        {
          type: "paragraph",
          text: "**AWS Cost Explorer** is the primary interactive UI for cloud cost analysis. It supports filtering and grouping by service, account, region, availability zone, instance type, purchase option, and up to two tag dimensions simultaneously. It includes 13 months of historical data by default and a 12-month forecast. Key capabilities: **anomaly detection** (ML-based alerts on unexpected spend changes), **Savings Plans recommendations** (based on your usage history), and **rightsizing recommendations** (EC2 instance downsizing with break-even analysis).",
        },
        {
          type: "callout",
          variant: "info",
          title: "Cost Explorer API",
          text: "Cost Explorer data is also accessible via the **AWS Cost Explorer API**, enabling programmatic retrieval of cost and usage data for custom dashboards, Slack bots, or weekly email digests. The API costs $0.01 per API request — budget for this if you're making frequent automated calls.",
        },
        {
          type: "heading",
          level: 2,
          text: "AWS Cost and Usage Report (CUR)",
        },
        {
          type: "paragraph",
          text: "The **Cost and Usage Report (CUR)** is the most detailed billing dataset AWS provides. It delivers line-item data for every AWS charge — including resource IDs, usage quantities, unit prices, reserved instance amortization, and all active cost allocation tags — to an **S3 bucket** in CSV or Parquet format. CUR files can be queried with **Amazon Athena** (pay-per-query SQL), **AWS Glue** (ETL pipelines), or loaded into **Amazon Redshift** for warehousing.",
        },
        {
          type: "table",
          headers: [
            "Reporting Tool",
            "Data Granularity",
            "Latency",
            "Best For",
          ],
          rows: [
            [
              "AWS Cost Explorer UI",
              "Account, service, region, tag",
              "Near real-time (few hours lag)",
              "Interactive analysis, anomaly investigation, savings recommendations",
            ],
            [
              "Cost Explorer API",
              "Account, service, region, tag",
              "Near real-time",
              "Programmatic dashboards, Slack alerts, automated reporting",
            ],
            [
              "AWS CUR (S3 + Athena)",
              "Resource ID, usage type, pricing details",
              "Daily or hourly delivery",
              "Detailed chargeback, custom allocation, large-scale BI analysis",
            ],
            [
              "Amazon QuickSight",
              "Any (pulls from Athena/Redshift/S3)",
              "Depends on data source",
              "Executive dashboards, multi-team showback portals",
            ],
            [
              "AWS Trusted Advisor",
              "Resource-level recommendations",
              "Weekly refresh",
              "Waste detection, cost optimization checks",
            ],
          ],
        },
        {
          type: "heading",
          level: 2,
          text: "Cost Anomaly Detection",
        },
        {
          type: "paragraph",
          text: "**AWS Cost Anomaly Detection** uses machine learning to monitor your spend and alert you when unusual patterns occur — for example, when EC2 spend spikes 200% above the expected range for a Sunday. You configure **monitors** (which spend segments to watch: services, linked accounts, cost categories, or tags) and **alert subscriptions** (thresholds and notification channels). It typically catches anomalies within a few hours, far faster than monthly budget reviews.",
        },
        {
          type: "bullet-list",
          items: [
            "Individual anomalies can be **acknowledged** to remove them from future alerts",
            "You can set anomaly alerts on absolute dollar thresholds ($500 impact) or percentage thresholds (50% above expected)",
            "Anomaly Detection is **free** — no additional charge beyond the AWS Cost Management service",
            "Common anomaly root causes: forgotten dev environments, runaway data transfer, Lambda recursive loops, misconfigured Auto Scaling",
          ],
        },
        {
          type: "heading",
          level: 2,
          text: "Building FinOps Dashboards with QuickSight",
        },
        {
          type: "paragraph",
          text: "**Amazon QuickSight** connected to CUR data via Athena enables fully customized FinOps dashboards — team-by-team cost allocation, month-over-month trends, coverage rates, and unit economics in a shareable web dashboard. AWS also provides a pre-built **Cloud Intelligence Dashboard (CID)** solution: an open-source CloudFormation template that deploys a full-featured QuickSight dashboard connected to your CUR data in under an hour.",
        },
        {
          type: "callout",
          variant: "tip",
          title: "AWS Cloud Intelligence Dashboard",
          text: "The free, open-source Cloud Intelligence Dashboard (deployed via AWS Well-Architected Labs) provides 10+ pre-built QuickSight dashboards including Cost Intelligence Dashboard, CUDOS, and KPI Dashboard. It is the fastest way to get a production-grade FinOps reporting portal without building from scratch.",
        },
      ],
      flashcards: [
        {
          id: "m1-cost-reporting-01",
          moduleId: "1",
          front:
            "What is the AWS Cost and Usage Report (CUR) and how is it typically queried?",
          back: "CUR is the most detailed AWS billing dataset — line-item data including resource IDs, usage quantities, pricing, and tag values — delivered to S3 in CSV or Parquet format. It is typically queried via Amazon Athena (pay-per-query SQL), which enables custom chargeback reports and detailed cost analysis not possible in Cost Explorer.",
          tags: ["cur", "athena", "cost-reporting"],
        },
        {
          id: "m1-cost-reporting-02",
          moduleId: "1",
          front:
            "What does AWS Cost Anomaly Detection do and what does it cost?",
          back: "It uses ML to monitor spend and alert when unusual patterns occur (e.g., EC2 costs spike 200% above normal on a Sunday). Monitors watch services, linked accounts, cost categories, or tags. Anomaly Detection itself is free — only the underlying AWS Cost Management service costs apply.",
          tags: ["anomaly-detection", "cost-explorer", "ml"],
        },
        {
          id: "m1-cost-reporting-03",
          moduleId: "1",
          front:
            "What is the AWS Cloud Intelligence Dashboard (CID) and why is it valuable?",
          back: "An open-source CloudFormation template (from AWS Well-Architected Labs) that deploys 10+ pre-built QuickSight dashboards (Cost Intelligence Dashboard, CUDOS, KPI Dashboard) connected to CUR data. It delivers a production-grade FinOps reporting portal in under an hour without custom development.",
          tags: ["quicksight", "cid", "dashboards"],
        },
        {
          id: "m1-cost-reporting-04",
          moduleId: "1",
          front:
            "What is the Cost Explorer API and what does it cost to use programmatically?",
          back: "The Cost Explorer API provides programmatic access to the same cost and usage data available in the UI, enabling custom dashboards, Slack bots, and automated reports. It costs $0.01 per API request — automated tools that make hundreds of calls daily should budget for this cost.",
          tags: ["cost-explorer", "api", "programmatic"],
        },
      ],
    },
    {
      id: "governance",
      title: "Cost Governance & Tagging Strategy",
      estimatedMinutes: 12,
      blocks: [
        {
          type: "heading",
          level: 2,
          text: "Cost Governance: What It Is and Why It Fails",
        },
        {
          type: "paragraph",
          text: "Cost governance is the set of policies, processes, and controls that ensure cloud spend is authorized, allocated, and optimized in alignment with business objectives. Governance frameworks fail when they are purely reactive (checking costs after the fact) or when engineers view them as bureaucratic overhead. Effective governance is lightweight, automated, and built into the provisioning workflow rather than bolted on afterward.",
        },
        {
          type: "heading",
          level: 2,
          text: "Designing a Tag Taxonomy",
        },
        {
          type: "paragraph",
          text: "**Resource tags** are the foundation of cost allocation. Tags are key-value pairs attached to AWS resources. For cost allocation, you activate tags in the Billing and Cost Management console, after which they appear in Cost Explorer and CUR as filterable dimensions. Consistent tagging enables showback and chargeback to teams, products, or cost centers — but only if tag coverage is high and consistent.",
        },
        {
          type: "table",
          headers: ["Tag Key", "Example Values", "Purpose", "Priority"],
          rows: [
            [
              "Environment",
              "production, staging, dev, sandbox",
              "Separate prod costs from non-prod; target optimization at non-prod",
              "Critical",
            ],
            [
              "Team",
              "platform, data-engineering, frontend, ml",
              "Allocate costs to engineering teams for showback/chargeback",
              "Critical",
            ],
            [
              "Project",
              "data-lake-v2, checkout-redesign, ml-platform",
              "Track project-specific spend against project budgets",
              "High",
            ],
            [
              "CostCenter",
              "CC-1234, CC-5678, CC-Marketing",
              "Map to finance cost center codes for formal chargeback",
              "High",
            ],
            [
              "Owner",
              "alice@company.com, team-platform",
              "Identify resource owner for accountability and anomaly follow-up",
              "Medium",
            ],
            [
              "ManagedBy",
              "terraform, cloudformation, console",
              "Identify provisioning method; console-created resources are harder to govern",
              "Medium",
            ],
          ],
        },
        {
          type: "callout",
          variant: "warning",
          title: "Tag Coverage Gaps Are Inevitable — Plan for Them",
          text: "Not all AWS resources support tagging (data transfer, support fees, some marketplace charges). Resources provisioned before tag policies were enforced will be untagged. Target 85%+ tag coverage for your top 5 tag keys — the remaining 15% should be handled by Cost Categories account-level rules. Trying to reach 100% tagging is often not worth the effort.",
        },
        {
          type: "heading",
          level: 2,
          text: "Enforcing Tagging at Provisioning Time",
        },
        {
          type: "paragraph",
          text: "The best time to enforce tags is before resources are created. **AWS Tag Policies** (an AWS Organizations feature) define required tag keys and allowed values — non-compliant resources are flagged in the Tag Policy compliance report. **AWS Config rules** like `required-tags` detect non-compliant resources after creation and can trigger automatic remediation via SSM Automation or Lambda.",
        },
        {
          type: "bullet-list",
          items: [
            "**Terraform**: enforce tags via `required_tags` variable validation or pre-commit hooks in `terraform-compliance`",
            "**AWS Service Catalog**: create pre-tagged product templates so engineers provision tagged resources by default",
            "**AWS CloudFormation**: use template-level stack tags that automatically propagate to all resources in the stack",
            "**AWS Config `required-tags` rule**: detect EC2 instances, S3 buckets, RDS instances lacking required tag keys",
            "**AWS Organizations Tag Policies**: enforce tag key case sensitivity (e.g., require `Environment` not `environment`) across all accounts",
          ],
        },
        {
          type: "heading",
          level: 2,
          text: "AWS Organizations and Service Control Policies",
        },
        {
          type: "paragraph",
          text: "**Service Control Policies (SCPs)** are permission guardrails applied at the AWS Organizations level. They restrict what IAM identities can do — even if the IAM policy allows it, an SCP can deny it. SCPs are the strongest cost governance enforcement mechanism because they cannot be overridden by account-level IAM. Common cost governance SCPs include denying GPU instance launches in sandbox OUs, restricting region provisioning to approved regions, and preventing deletion of billing-critical services like Config or CloudTrail.",
        },
        {
          type: "callout",
          variant: "important",
          title: "SCPs Do Not Grant Permissions",
          text: "SCPs are deny-only guardrails. They cannot be used to grant permissions that IAM doesn't already allow. A common mistake is writing an SCP to 'allow' EC2 launches thinking it replaces IAM — it does not. SCPs only constrain the maximum permissions available to identities in an account.",
        },
        {
          type: "heading",
          level: 2,
          text: "AWS Cost Categories for Governance",
        },
        {
          type: "paragraph",
          text: "**AWS Cost Categories** create custom billing-layer groupings of costs that appear in Cost Explorer and CUR. Rules can map accounts, tags, services, or charge types into named categories. This is powerful when tagging is incomplete — you can categorize entire linked accounts to a business unit, solving 80% of the allocation problem without touching resource tags. Category rule changes are retroactive up to 12 months, unlike tags which only apply forward.",
        },
        {
          type: "callout",
          variant: "info",
          title: "Cost Categories vs. Tags: When to Use Each",
          text: "Use tags for fine-grained, resource-level allocation within accounts. Use Cost Categories for coarse-grained allocation across accounts and services, for handling untaggable resources, and for splitting shared costs (e.g., AWS Support fees split proportionally by business unit spend). The two mechanisms complement each other — mature orgs use both.",
        },
      ],
      flashcards: [
        {
          id: "m1-governance-01",
          moduleId: "1",
          front:
            "What tag keys should every organization treat as 'Critical' for cost allocation?",
          back: "Environment (production/staging/dev) and Team are universally critical — they enable separation of prod vs. non-prod costs and team-level showback/chargeback. Project and CostCenter are high priority when project budgeting and finance chargeback are required.",
          tags: ["tagging", "governance", "cost-allocation"],
        },
        {
          id: "m1-governance-02",
          moduleId: "1",
          front:
            "What are Service Control Policies (SCPs) and what is the most common misconception about them?",
          back: "SCPs are AWS Organizations permission guardrails that restrict what IAM identities can do across accounts, even overriding account-level IAM. Common misconception: SCPs cannot grant permissions — they are deny-only guardrails. Writing an SCP to 'allow' something doesn't replace IAM policy requirements.",
          tags: ["scps", "aws-organizations", "governance"],
        },
        {
          id: "m1-governance-03",
          moduleId: "1",
          front:
            "What is the difference between AWS Tag Policies and AWS Config required-tags rule?",
          back: "Tag Policies (via AWS Organizations) enforce tag key naming and allowed values at creation time and generate compliance reports across accounts. AWS Config required-tags rule detects non-compliant resources after creation and can trigger automated remediation. Tag Policies are preventive; Config is detective.",
          tags: ["tag-policies", "config", "governance"],
        },
        {
          id: "m1-governance-04",
          moduleId: "1",
          front:
            "Why are AWS Cost Categories more powerful than tags for handling untaggable resources?",
          back: "Not all AWS resources support tagging (data transfer, support fees, marketplace charges). Cost Categories can group these costs using account-level or service-level rules at the billing layer — no resource tagging required. Category rule changes are also retroactive up to 12 months.",
          tags: ["cost-categories", "governance", "untaggable"],
        },
        {
          id: "m1-governance-05",
          moduleId: "1",
          front:
            "What is the recommended minimum tag coverage target, and how should the remainder be handled?",
          back: "Target 85%+ coverage for your top 5 tag keys. The remaining ~15% (untaggable resources, pre-policy legacy resources) should be handled via AWS Cost Categories account-level rules. Pursuing 100% tagging coverage has diminishing returns and diverts effort from higher-value optimization work.",
          tags: ["tagging", "coverage", "governance"],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "m1-q1",
      text: "A startup has been on AWS for 2 months and is spending $80,000/month. The CFO asks the engineering lead for a Q3 cloud forecast. The engineering team has no tagging strategy, no Cost Explorer setup, and no cost allocation. Which FinOps phase should they prioritize FIRST, and why?",
      options: [
        "Operate — they should immediately establish a FinOps team with weekly rituals and KPI tracking",
        "Optimize — they should buy Reserved Instances immediately to reduce On-Demand spend before the quarter ends",
        "Inform — they need visibility into what they're spending on and who owns it before they can forecast or optimize",
        "Allocate — they should implement chargeback to engineering teams so each team is accountable for overruns",
      ],
      correctIndex: 2,
      explanation:
        "The Inform phase must come first. Without cost allocation tags, the engineering team cannot identify what is driving the $80K/month bill, let alone forecast it. Buying RIs without usage baseline data risks over-committing on the wrong instance types. 'Allocate' is not a FinOps phase — it is an activity within Inform. Jumping to Operate without Inform fundamentals creates governance without visibility.",
    },
    {
      id: "m1-q2",
      text: "A company's Migration Evaluator assessment shows 200 on-premises servers at 15% average CPU utilization, currently provisioned as dual-socket 32-core servers. The Pricing Calculator estimate (using peak capacity) shows AWS costs are HIGHER than on-premises. What is the most likely explanation for this discrepancy?",
      options: [
        "The Pricing Calculator used the wrong AWS region for pricing",
        "The Pricing Calculator estimate used full provisioned capacity rather than rightsized instances reflecting actual utilization",
        "Migration Evaluator does not account for data transfer costs, which are much higher on AWS",
        "The on-premises TCO excluded software licensing costs, making cloud look cheaper in Migration Evaluator",
      ],
      correctIndex: 1,
      explanation:
        "This is the most common business case error. AWS Pricing Calculator requires manual input of instance types and sizes. If engineers specify instances matching the physical server's full CPU/RAM capacity (e.g., 32-vCPU instances) rather than the rightsize based on 15% actual utilization (which would warrant 4-8 vCPU instances), the AWS estimate is dramatically inflated. Migration Evaluator avoids this by using actual utilization data automatically.",
    },
    {
      id: "m1-q3",
      text: "Your AWS Cost Explorer forecast shows you will spend $120,000 in the current month against a $100,000 budget. You have a Budget Action configured to apply a DenyEC2Launch IAM policy at 100% of budget. It is currently the 20th of the month and you have already spent $95,000. Which statement is TRUE?",
      options: [
        "The Budget Action will fire immediately because the forecasted spend exceeds 100% of budget",
        "The Budget Action will fire only when actual spend reaches $100,000, and it will not reverse the $95,000 already spent",
        "The Budget Action fired when the forecast first exceeded $100,000, automatically preventing further EC2 launches since then",
        "Budget Actions cannot be triggered by forecasted spend — only by actual spend thresholds",
      ],
      correctIndex: 1,
      explanation:
        "Budget Actions fire based on the threshold type configured. If set to 'Actual' at 100%, it fires when actual spend reaches $100,000 — which hasn't happened yet at $95,000. The action does NOT reverse charges already incurred; it only prevents future provisioning. AWS Budget Actions CAN be configured on forecasted thresholds, but only if that was set up at budget creation — this question specifies the action is at 100% (actual implied). The key insight is that Budget Actions are forward-looking only.",
    },
    {
      id: "m1-q4",
      text: "A FinOps team wants to forecast cloud costs using a driver-based approach. Their SaaS product currently serves 100,000 active users at $42,000/month in AWS costs. Marketing projects 25% user growth next quarter. What should the baseline cloud forecast be for next quarter, before any efficiency improvements?",
      options: [
        "$42,000/month — user growth doesn't automatically mean higher cloud costs",
        "$52,500/month — $42,000 × 1.25 growth factor applied to current cost",
        "$10,500/month — the incremental cost for 25,000 new users at $0.42/user",
        "$47,250/month — $42,000 plus a 12.5% midpoint estimate between 0% and 25% growth",
      ],
      correctIndex: 1,
      explanation:
        "Driver-based forecasting: current cost per user = $42,000 / 100,000 = $0.42/user/month. Projected users = 100,000 × 1.25 = 125,000. Projected cost = 125,000 × $0.42 = $52,500/month. This is the baseline before any efficiency improvements. The FinOps team should then separately model any unit cost improvements from optimization work (e.g., rightsizing, Savings Plans) that might reduce the $0.42 cost driver.",
    },
    {
      id: "m1-q5",
      text: "An organization wants to enforce that all EC2 instances have an 'Environment' tag before they are launched. Which combination of AWS services achieves PREVENTIVE enforcement (blocking at creation time) rather than detective enforcement (alerting after creation)?",
      options: [
        "AWS Config required-tags rule + AWS CloudTrail logging",
        "AWS Cost Explorer tag coverage report + manual review process",
        "AWS Organizations Tag Policy + SCP denying EC2 RunInstances when the Environment tag is missing",
        "AWS Trusted Advisor tag governance check + AWS Lambda auto-remediation",
      ],
      correctIndex: 2,
      explanation:
        "Preventive controls block non-compliant actions before they succeed. An SCP that denies `ec2:RunInstances` when the `aws:RequestTag/Environment` condition is not present prevents untagged EC2 launches at the Organizations level. AWS Organizations Tag Policies define the allowed values and key naming. Config rules (option A) and Trusted Advisor (option D) are detective — they identify non-compliance after the resource already exists. Cost Explorer reports (option B) are purely informational.",
    },
  ],
};
