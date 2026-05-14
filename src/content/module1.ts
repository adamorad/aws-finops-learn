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
      estimatedMinutes: 8,
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
          text: "FinOps helps organizations maximize business value from cloud investment. Sometimes that means spending more in areas that drive revenue, while optimizing waste elsewhere.",
        },
        {
          type: "heading",
          level: 2,
          text: "The Three FinOps Phases",
        },
        {
          type: "table",
          headers: ["Phase", "Goal", "Key Activities"],
          rows: [
            [
              "Inform",
              "Visibility & allocation",
              "Cost allocation tags, dashboards, anomaly detection, showback reports",
            ],
            [
              "Optimize",
              "Reduce waste & improve efficiency",
              "Right-sizing, Reserved Instances, Savings Plans, Spot usage",
            ],
            [
              "Operate",
              "Continuous improvement",
              "FinOps team rituals, automation, unit economics, KPI tracking",
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
            "Teams need to collaborate across Finance, Engineering, and Business",
            "Everyone takes ownership of their cloud usage",
            "A central FinOps team drives best practices and enables teams",
            "FinOps reports should be timely — near real-time data is preferred over monthly batch",
            "Decisions are driven by the business value of cloud, not just cost reduction",
            "Take advantage of the variable cost model of cloud (only pay for what you use)",
          ],
        },
        {
          type: "heading",
          level: 2,
          text: "Who Practices FinOps?",
        },
        {
          type: "paragraph",
          text: "FinOps involves multiple personas: **FinOps Practitioners** (dedicated cloud finance analysts), **Engineers** (who instrument code and provision resources), **Finance teams** (who forecast and track budgets), **Product owners** (who balance feature velocity with cost), and **Executives** (who set cloud strategy and accountability).",
        },
        {
          type: "callout",
          variant: "tip",
          title: "FinOps Maturity Model",
          text: "Organizations progress through Crawl (basic visibility), Walk (some optimization and allocation), and Run (full automation, unit economics, real-time decisions). Most enterprises begin at Crawl and incrementally mature.",
        },
      ],
      flashcards: [
        {
          id: "m1-intro-01",
          moduleId: "1",
          front: "What are the three phases of the FinOps lifecycle?",
          back: "Inform (gain visibility and allocate costs), Optimize (reduce waste using commitments and right-sizing), and Operate (continuous improvement through automation and KPIs).",
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
          back: "Three maturity stages: Crawl (basic tagging and visibility), Walk (some optimization and showback), and Run (full automation, real-time decisions, and unit economics).",
          tags: ["finops", "maturity"],
        },
        {
          id: "m1-intro-04",
          moduleId: "1",
          front: "Why is near-real-time cost data important in FinOps?",
          back: "Cloud spend is variable and can spike rapidly. Near-real-time data lets teams detect anomalies and act before costs accumulate, unlike monthly batch reporting which is too slow.",
          tags: ["finops", "visibility", "data"],
        },
      ],
    },
    {
      id: "migration-biz-case",
      title: "Migration Business Cases",
      estimatedMinutes: 10,
      blocks: [
        {
          type: "heading",
          level: 2,
          text: "Building a Cloud Migration Business Case",
        },
        {
          type: "paragraph",
          text: "A migration business case quantifies the financial and strategic value of moving workloads to AWS. It compares the **Total Cost of Ownership (TCO)** of on-premises infrastructure against projected AWS costs, and also captures non-cost benefits like agility, reduced operational burden, and faster innovation.",
        },
        {
          type: "heading",
          level: 2,
          text: "Total Cost of Ownership (TCO)",
        },
        {
          type: "paragraph",
          text: "On-premises TCO includes costs that are often hidden or under-attributed: hardware amortization, data center facilities (power, cooling, space), networking, software licenses, labor for operations, and the opportunity cost of long procurement cycles. AWS TCO analysis must capture all of these against the equivalent cloud cost.",
        },
        {
          type: "table",
          headers: ["Cost Category", "On-Premises", "AWS Cloud"],
          rows: [
            [
              "Compute",
              "Server capex + refresh cycle",
              "EC2 On-Demand, Reserved, or Savings Plans",
            ],
            [
              "Storage",
              "SAN/NAS capex + maintenance",
              "S3, EBS, EFS — pay per GB used",
            ],
            [
              "Networking",
              "Switches, routers, WAN circuits",
              "Data transfer fees + VPC networking",
            ],
            [
              "Facilities",
              "Data center space, power, cooling",
              "Included in AWS pricing",
            ],
            [
              "Labor",
              "Racking, patching, hardware failures",
              "Reduced; focus shifts to higher-value work",
            ],
            [
              "Licensing",
              "Per-socket or per-core OS/DB licenses",
              "License-included options or BYOL",
            ],
          ],
        },
        {
          type: "heading",
          level: 2,
          text: "AWS Tools for Business Case Development",
        },
        {
          type: "bullet-list",
          items: [
            "**AWS Pricing Calculator** (calculator.aws): Build custom cost estimates for any AWS service combination. Model EC2 instance types, storage, data transfer, and more.",
            "**Migration Evaluator** (formerly TSO Logic): Ingests actual on-premises utilization data (from agents or import files) and produces a rightsized AWS cost estimate with a directional business case.",
            "**AWS Migration Hub**: Tracks migration progress and provides a central place to plan which servers move to which AWS services.",
            "**AWS Well-Architected Tool**: Assesses architecture quality, which feeds into operational cost savings estimates post-migration.",
          ],
        },
        {
          type: "callout",
          variant: "important",
          title: "Migration Evaluator vs. AWS Pricing Calculator",
          text: "Migration Evaluator uses actual utilization metrics from your on-premises environment to produce rightsized estimates, while AWS Pricing Calculator requires you to manually specify instance types and quantities. Use Migration Evaluator for large-scale assessments and AWS Pricing Calculator for targeted service estimates.",
        },
        {
          type: "heading",
          level: 2,
          text: "Business Case Components",
        },
        {
          type: "numbered-list",
          items: [
            "Current state cost inventory: document all on-premises costs across compute, storage, network, labor, and facilities",
            "AWS future state estimate: use Migration Evaluator or AWS Pricing Calculator with rightsized assumptions",
            "Migration cost estimate: one-time costs of re-hosting, re-platforming, or refactoring workloads",
            "Net Present Value (NPV) and payback period: factor in migration costs and ongoing savings over 3-5 years",
            "Non-financial benefits: agility, security posture, compliance, developer productivity, reduced time-to-market",
          ],
        },
        {
          type: "callout",
          variant: "tip",
          title: "Rightsizing Assumption",
          text: "On-premises servers are often provisioned at peak capacity and run at 10-20% average utilization. AWS estimates should reflect rightsized instances at 60-70% utilization to avoid inflating the cloud cost side of the business case.",
        },
      ],
      flashcards: [
        {
          id: "m1-migration-biz-case-01",
          moduleId: "1",
          front:
            "What is Migration Evaluator and how does it differ from AWS Pricing Calculator?",
          back: "Migration Evaluator ingests actual on-premises utilization data to produce rightsized AWS estimates automatically. AWS Pricing Calculator requires manual specification of instance types and quantities. Migration Evaluator is better for large-scale discovery.",
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
          back: "Data center facilities (power, cooling, floor space), hardware refresh cycles, network equipment, software licensing overhead, and labor costs for hardware maintenance and patching.",
          tags: ["tco", "migration", "on-premises"],
        },
        {
          id: "m1-migration-biz-case-03",
          moduleId: "1",
          front:
            "Why should migration business cases assume rightsized utilization rather than peak capacity?",
          back: "On-premises servers typically run at 10-20% average utilization but are provisioned for peak. Using peak utilization in AWS estimates inflates the cloud cost, making the business case look worse than it actually is.",
          tags: ["rightsizing", "migration", "tco"],
        },
        {
          id: "m1-migration-biz-case-04",
          moduleId: "1",
          front:
            "What are the five key components of an AWS migration business case?",
          back: "1) Current state cost inventory, 2) AWS future state estimate, 3) Migration cost estimate (one-time), 4) NPV and payback period analysis, 5) Non-financial benefits (agility, security, developer productivity).",
          tags: ["migration", "business-case"],
        },
      ],
    },
    {
      id: "forecasting",
      title: "Cloud Forecasting",
      estimatedMinutes: 10,
      blocks: [
        {
          type: "heading",
          level: 2,
          text: "Why Cloud Forecasting is Different",
        },
        {
          type: "paragraph",
          text: "Cloud spend is inherently variable — it responds to traffic patterns, new feature launches, team growth, and seasonal demand. Unlike fixed on-premises capex, cloud costs change monthly. Accurate forecasting requires combining historical trends with business context (planned projects, headcount, new regions).",
        },
        {
          type: "heading",
          level: 2,
          text: "Forecasting Methods",
        },
        {
          type: "table",
          headers: ["Method", "Description", "Best For"],
          rows: [
            [
              "Trend-based",
              "Extrapolate from historical spend using growth rates or moving averages",
              "Stable workloads with predictable growth",
            ],
            [
              "Driver-based",
              "Link cloud spend to business metrics (users, transactions, revenue)",
              "Workloads with clear unit economics",
            ],
            [
              "Bottom-up",
              "Sum forecasts from individual teams or workloads",
              "Organizations with mature tagging and allocation",
            ],
            [
              "Top-down",
              "Apply budget envelope and distribute across teams",
              "Early-stage FinOps or new fiscal year planning",
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
          text: "AWS Cost Explorer includes a built-in forecasting feature that uses **machine learning** to predict future costs based on your historical usage. It generates forecasts for up to **12 months** into the future with confidence intervals. Forecasts are available at the account, service, linked account, and tag level.",
        },
        {
          type: "callout",
          variant: "info",
          title: "Cost Explorer Forecast Requirements",
          text: "Cost Explorer requires at least 7 days of historical cost data to generate a forecast, but at least 60 days of data is recommended for meaningful accuracy. Accounts with highly seasonal or irregular spend may see wider confidence intervals.",
        },
        {
          type: "heading",
          level: 2,
          text: "Budget vs. Actuals Tracking",
        },
        {
          type: "paragraph",
          text: "Tracking **budget vs. actuals** is the core FinOps feedback loop. Finance teams set budgets at the start of the fiscal year; FinOps teams track actual spend weekly or monthly and report on variance. A variance of more than ±10-15% typically triggers a review.",
        },
        {
          type: "bullet-list",
          items: [
            "Use AWS Cost Explorer to pull actuals by service, account, or tag",
            "Compare against approved budgets in AWS Budgets or external finance systems",
            "Identify variance drivers: new services, unexpected data transfer, missing Savings Plans coverage",
            "Reforecast quarterly with updated business drivers (headcount, new products, market changes)",
            "Track unit economics (cost per user, cost per transaction) to normalize for business growth",
          ],
        },
        {
          type: "callout",
          variant: "tip",
          title: "Driver-Based Forecasting Example",
          text: "If your SaaS product costs $0.50/active user/month in AWS, and marketing projects 10,000 new users next quarter, you can add $5,000/month to your cloud forecast. This ties engineering spend directly to business outcomes.",
        },
      ],
      flashcards: [
        {
          id: "m1-forecasting-01",
          moduleId: "1",
          front: "What is driver-based forecasting in cloud cost management?",
          back: "Linking cloud spend to business metrics (e.g., active users, API calls, transactions) to forecast costs as a function of business growth rather than purely extrapolating from historical spend.",
          tags: ["forecasting", "driver-based"],
        },
        {
          id: "m1-forecasting-02",
          moduleId: "1",
          front:
            "How far into the future can AWS Cost Explorer generate forecasts, and what does it use?",
          back: "Up to 12 months. Cost Explorer uses machine learning trained on your historical usage data, and provides confidence intervals. At least 60 days of history is recommended for accuracy.",
          tags: ["cost-explorer", "forecasting", "aws"],
        },
        {
          id: "m1-forecasting-03",
          moduleId: "1",
          front:
            "What is the difference between trend-based and bottom-up forecasting?",
          back: "Trend-based extrapolates from historical spend growth rates. Bottom-up aggregates forecasts from individual teams or workloads and requires mature cost allocation (tagging) to be meaningful.",
          tags: ["forecasting", "methods"],
        },
        {
          id: "m1-forecasting-04",
          moduleId: "1",
          front:
            "What variance percentage typically triggers a budget review in cloud FinOps?",
          back: "A variance of more than ±10-15% between actual spend and forecasted/budgeted spend typically prompts investigation and a formal budget review.",
          tags: ["budgeting", "variance", "governance"],
        },
      ],
    },
    {
      id: "budgeting",
      title: "Budgeting with AWS Budgets",
      estimatedMinutes: 10,
      blocks: [
        {
          type: "heading",
          level: 2,
          text: "AWS Budgets Overview",
        },
        {
          type: "paragraph",
          text: "AWS Budgets lets you set custom cost and usage budgets, and receive alerts when you approach or exceed thresholds. Budgets can be scoped to an entire account, linked account, service, tag, cost category, or purchase option. You can also configure automated **Budget Actions** to respond to threshold breaches without manual intervention.",
        },
        {
          type: "heading",
          level: 2,
          text: "Types of AWS Budgets",
        },
        {
          type: "table",
          headers: ["Budget Type", "Tracks", "Common Use Case"],
          rows: [
            [
              "Cost Budget",
              "Dollar spend",
              "Monthly AWS spend per account or business unit",
            ],
            [
              "Usage Budget",
              "Service units (e.g., EC2 hours, S3 GB)",
              "Track consumption limits independent of pricing changes",
            ],
            [
              "Savings Plans Budget",
              "Savings Plans utilization or coverage %",
              "Ensure purchased Savings Plans are fully utilized",
            ],
            [
              "Reservation Budget",
              "Reserved Instance utilization or coverage %",
              "Monitor RI portfolio health and identify gaps",
            ],
          ],
        },
        {
          type: "heading",
          level: 2,
          text: "Budget Alerts",
        },
        {
          type: "paragraph",
          text: "Each budget can have up to **10 alert thresholds**. Alerts can be triggered on **actual** spend (charges already incurred) or **forecasted** spend (Cost Explorer prediction). Notifications are sent via **Amazon SNS** or **email**. You can alert at multiple thresholds — for example, 50%, 80%, and 100% of budget.",
        },
        {
          type: "callout",
          variant: "warning",
          title: "Actual vs. Forecasted Alerts",
          text: "Actual alerts fire when you have already spent the threshold amount. Forecasted alerts fire when Cost Explorer predicts you will exceed the threshold by end of period — giving you advance warning. Use both for comprehensive coverage.",
        },
        {
          type: "heading",
          level: 2,
          text: "Budget Actions",
        },
        {
          type: "paragraph",
          text: "**Budget Actions** automate responses when a budget threshold is crossed. Actions can: apply an IAM policy (e.g., deny provisioning of expensive instance types), attach a Service Control Policy (SCP) to an AWS Organizations OU, or target an EC2/RDS instance for stop or termination.",
        },
        {
          type: "bullet-list",
          items: [
            "Actions require an IAM role with permissions to execute the configured action",
            "Actions can be set to run automatically or require manual approval",
            "Common action: apply a DenyEC2Launch SCP when a dev account exceeds $500/month",
            "Actions are auditable via AWS CloudTrail",
            "Budget Actions do not retroactively reverse charges — they prevent further spend",
          ],
        },
        {
          type: "callout",
          variant: "tip",
          title: "Free Tier Budgets",
          text: "Create a zero-spend budget or an AWS Free Tier budget to get alerted the moment any charge appears in a sandbox or test account. This is useful for accounts where no real spend should ever occur.",
        },
      ],
      flashcards: [
        {
          id: "m1-budgeting-01",
          moduleId: "1",
          front: "What are the four types of AWS Budgets?",
          back: "Cost Budget (dollar spend), Usage Budget (service units like EC2 hours or S3 GB), Savings Plans Budget (utilization/coverage of Savings Plans), and Reservation Budget (RI utilization/coverage).",
          tags: ["aws-budgets", "budget-types"],
        },
        {
          id: "m1-budgeting-02",
          moduleId: "1",
          front:
            "What is the difference between an actual and a forecasted AWS Budgets alert?",
          back: "Actual alerts fire when the spend threshold has already been reached. Forecasted alerts fire when Cost Explorer predicts the threshold will be reached by end of the budget period — providing advance warning.",
          tags: ["aws-budgets", "alerts"],
        },
        {
          id: "m1-budgeting-03",
          moduleId: "1",
          front: "What can AWS Budget Actions do when a threshold is breached?",
          back: "They can automatically apply an IAM policy, attach a Service Control Policy (SCP) to an AWS Organizations OU, or stop/terminate EC2 or RDS instances. Actions can run automatically or require manual approval.",
          tags: ["aws-budgets", "budget-actions", "automation"],
        },
        {
          id: "m1-budgeting-04",
          moduleId: "1",
          front: "How many alert thresholds can a single AWS Budget have?",
          back: "Up to 10 alert thresholds per budget. Each threshold can be set on actual or forecasted spend and can notify via Amazon SNS or email.",
          tags: ["aws-budgets", "alerts"],
        },
      ],
    },
    {
      id: "governance",
      title: "Cost Governance",
      estimatedMinutes: 10,
      blocks: [
        {
          type: "heading",
          level: 2,
          text: "Cost Governance Fundamentals",
        },
        {
          type: "paragraph",
          text: "Cost governance is the set of policies, processes, and controls that ensure cloud spend is authorized, allocated, and optimized in alignment with business objectives. It spans tagging strategies, organizational controls via AWS Organizations, cost categorization, and review cadences.",
        },
        {
          type: "heading",
          level: 2,
          text: "Tagging Strategies",
        },
        {
          type: "paragraph",
          text: "**Resource tags** are the foundation of cost allocation. Tags are key-value pairs attached to AWS resources. For cost allocation, you activate tags in the Billing console, which then appear in Cost Explorer and CUR reports. Consistent tagging enables showback and chargeback to teams, products, or cost centers.",
        },
        {
          type: "table",
          headers: ["Tag Key", "Example Value", "Purpose"],
          rows: [
            [
              "Environment",
              "production, staging, dev",
              "Separate prod costs from non-prod",
            ],
            [
              "Team",
              "platform, data-engineering, frontend",
              "Allocate costs to engineering teams",
            ],
            [
              "Project",
              "data-lake, checkout-v2, ml-platform",
              "Track project-specific spend",
            ],
            [
              "CostCenter",
              "CC-1234, CC-5678",
              "Map to finance cost centers for chargeback",
            ],
            [
              "Owner",
              "alice@company.com",
              "Identify resource owner for accountability",
            ],
          ],
        },
        {
          type: "callout",
          variant: "warning",
          title: "Tag Coverage Gaps",
          text: "Not all AWS resources support tagging (e.g., data transfer, some support fees). Additionally, resources provisioned before tagging policies were enforced will be untagged. Use AWS Config rules or tag policies to detect and remediate missing tags.",
        },
        {
          type: "heading",
          level: 2,
          text: "AWS Organizations and SCPs",
        },
        {
          type: "paragraph",
          text: "**Service Control Policies (SCPs)** are permission guardrails applied at the AWS Organizations level. They do not grant permissions — they restrict what actions IAM identities can perform, even if their IAM policies allow it. SCPs can enforce cost governance by preventing creation of expensive resources in certain OUs.",
        },
        {
          type: "bullet-list",
          items: [
            "Deny launch of GPU instances (p3, p4) in sandbox OUs",
            "Restrict which AWS regions engineers can provision resources in",
            "Require specific tags at resource creation via AWS Tag Policies (separate from SCPs)",
            "Prevent deletion of billing-related resources like AWS Config or CloudTrail",
            "Deny purchase of On-Demand capacity for accounts that should use Spot or Reserved",
          ],
        },
        {
          type: "heading",
          level: 2,
          text: "AWS Cost Categories",
        },
        {
          type: "paragraph",
          text: "**AWS Cost Categories** let you create custom groupings of costs that appear in Cost Explorer and CUR. You define rules to map accounts, tags, services, or charge types into named categories. This is useful when tagging is incomplete — you can categorize entire linked accounts to a business unit even if individual resources are untagged.",
        },
        {
          type: "callout",
          variant: "info",
          title: "Cost Categories vs. Tags",
          text: "Tags must be applied to individual resources. Cost Categories are a billing-layer abstraction — they can group costs from multiple dimensions (accounts + tags + services) into a single category, and are retroactive up to 12 months when rules change.",
        },
      ],
      flashcards: [
        {
          id: "m1-governance-01",
          moduleId: "1",
          front:
            "What is the primary purpose of resource tagging in AWS cost governance?",
          back: "Tags enable cost allocation — attributing AWS spend to teams, projects, environments, or cost centers. Activated tags appear in Cost Explorer and CUR, enabling showback and chargeback.",
          tags: ["tagging", "governance", "cost-allocation"],
        },
        {
          id: "m1-governance-02",
          moduleId: "1",
          front:
            "What are Service Control Policies (SCPs) and how do they support cost governance?",
          back: "SCPs are AWS Organizations permission guardrails that restrict what IAM identities can do across accounts, even if their IAM policies allow it. They can enforce cost controls like denying launch of expensive instance types or restricting regions.",
          tags: ["scps", "aws-organizations", "governance"],
        },
        {
          id: "m1-governance-03",
          moduleId: "1",
          front:
            "What is the difference between AWS Cost Categories and resource tags?",
          back: "Tags are applied to individual resources. Cost Categories are billing-layer rules that group costs from multiple dimensions (accounts, tags, services) into named categories — useful when tagging is incomplete. Categories are retroactive up to 12 months.",
          tags: ["cost-categories", "tags", "governance"],
        },
        {
          id: "m1-governance-04",
          moduleId: "1",
          front:
            "What tool can enforce tag requirements at resource creation time in AWS?",
          back: "AWS Tag Policies (an AWS Organizations feature) can define required tag keys and allowed values. AWS Config rules can detect non-compliant resources after creation.",
          tags: ["tagging", "tag-policies", "governance"],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "m1-q1",
      text: "Which FinOps phase focuses on gaining visibility into cloud spend and allocating costs to teams?",
      options: ["Operate", "Optimize", "Inform", "Allocate"],
      correctIndex: 2,
      explanation:
        "The Inform phase is about gaining visibility into cloud costs, activating tags, building dashboards, and allocating spend to teams. Optimize reduces waste; Operate drives continuous improvement. 'Allocate' is not a FinOps phase.",
    },
    {
      id: "m1-q2",
      text: "What is the key advantage of AWS Migration Evaluator over the AWS Pricing Calculator for business case development?",
      options: [
        "Migration Evaluator is free while Pricing Calculator charges per estimate",
        "Migration Evaluator ingests actual on-premises utilization data to produce rightsized estimates automatically",
        "Migration Evaluator supports more AWS services than Pricing Calculator",
        "Migration Evaluator integrates directly with AWS Cost Explorer",
      ],
      correctIndex: 1,
      explanation:
        "Migration Evaluator (formerly TSO Logic) collects or imports actual on-premises utilization metrics and uses them to generate rightsized AWS cost estimates. AWS Pricing Calculator requires manual entry of instance types and counts. Both tools are free to use.",
    },
    {
      id: "m1-q3",
      text: "How far into the future can AWS Cost Explorer's built-in forecasting feature predict costs?",
      options: ["3 months", "6 months", "12 months", "24 months"],
      correctIndex: 2,
      explanation:
        "AWS Cost Explorer can forecast costs up to 12 months into the future. It uses machine learning trained on your historical usage data and provides confidence intervals. At least 60 days of history is recommended for meaningful accuracy.",
    },
    {
      id: "m1-q4",
      text: "A Budget Action in AWS Budgets is configured to automatically apply an SCP to restrict new EC2 launches when spend exceeds $1,000. What does this action require to execute?",
      options: [
        "An AWS Support plan of Business tier or above",
        "An IAM role with permissions to perform the configured action",
        "Amazon EventBridge integration with a Lambda function",
        "AWS CloudFormation StackSets enabled in the management account",
      ],
      correctIndex: 1,
      explanation:
        "Budget Actions require an IAM role that grants AWS Budgets permission to execute the action (apply an IAM policy, attach an SCP, or stop/terminate instances). No special support plan or additional services are required for basic Budget Actions.",
    },
    {
      id: "m1-q5",
      text: "Which statement correctly describes AWS Cost Categories compared to resource tags?",
      options: [
        "Cost Categories must be applied at resource creation time, just like tags",
        "Cost Categories can only group costs by AWS service, not by account or tag",
        "Cost Categories are retroactive and can group costs from multiple dimensions including accounts, tags, and services",
        "Cost Categories replace resource tags once the tagging coverage reaches 100%",
      ],
      correctIndex: 2,
      explanation:
        "AWS Cost Categories are a billing-layer abstraction. They use rules to group costs from multiple dimensions (accounts, tags, charge types, services) into named categories. Changes to category rules are retroactive up to 12 months, unlike tags which must be applied to resources before costs are incurred.",
    },
  ],
};
