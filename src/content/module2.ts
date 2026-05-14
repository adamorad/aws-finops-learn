import type { Module } from "../types/content";

export const module2: Module = {
  id: "2",
  title: "FinOps Fundamentals Pt. 2",
  subtitle: "Optimization, Allocation & Pricing",
  description:
    "Go beyond the basics: learn cost optimization strategies, implement cost allocation and showback, master AWS pricing models including Reserved Instances and Savings Plans, and understand cloud sustainability practices.",
  icon: "TrendingDown",
  sections: [
    {
      id: "cost-optimization-intro",
      title: "Cost Optimization Strategies",
      estimatedMinutes: 10,
      blocks: [
        {
          type: "heading",
          level: 2,
          text: "The Cost Optimization Hierarchy",
        },
        {
          type: "paragraph",
          text: "Cost optimization is most effective when applied in order of impact: first **eliminate waste** (unused resources provide zero value), then **right-size** (match resource size to actual demand), then **apply commitment discounts** (Reserved Instances and Savings Plans for stable workloads), and finally **use spot or preemptible capacity** where workloads tolerate interruption.",
        },
        {
          type: "heading",
          level: 2,
          text: "Right-Sizing",
        },
        {
          type: "paragraph",
          text: "Right-sizing is the process of matching EC2 instance types and sizes to actual workload resource requirements. Many organizations over-provision out of caution, running large instances at 10-30% CPU utilization. AWS Compute Optimizer analyzes CloudWatch metrics and recommends optimal instance types using machine learning.",
        },
        {
          type: "table",
          headers: ["Tool", "What It Analyzes", "Output"],
          rows: [
            [
              "AWS Compute Optimizer",
              "EC2, Lambda, EBS, ECS on Fargate, Auto Scaling Groups",
              "Instance type recommendations with projected savings",
            ],
            [
              "AWS Trusted Advisor",
              "EC2 low utilization, idle load balancers, unattached EBS, RDS idle",
              "Cost optimization checks with estimated monthly savings",
            ],
            [
              "Cost Explorer Right-Sizing",
              "EC2 instances across linked accounts",
              "Downsizing recommendations with break-even analysis",
            ],
            [
              "AWS Cost and Usage Report (CUR)",
              "Raw line-item usage data",
              "Custom analysis; requires Athena or BI tooling",
            ],
          ],
        },
        {
          type: "heading",
          level: 2,
          text: "Eliminating Waste",
        },
        {
          type: "bullet-list",
          items: [
            "**Idle EC2 instances**: instances with <5% CPU and <5 MB/s network for 14+ days — stop or terminate",
            "**Unattached EBS volumes**: volumes not attached to any instance — snapshot and delete",
            "**Unused Elastic IPs**: EIPs not associated with a running instance incur hourly charges",
            "**Idle load balancers**: ALBs/NLBs with no healthy targets or minimal traffic",
            "**Old snapshots**: EBS and RDS snapshots accumulate silently — audit and delete stale ones",
            "**Unused NAT Gateways**: NAT Gateways charge per hour plus per GB processed even with zero traffic",
          ],
        },
        {
          type: "heading",
          level: 2,
          text: "AWS Trusted Advisor",
        },
        {
          type: "paragraph",
          text: "AWS Trusted Advisor provides real-time recommendations across cost optimization, performance, security, fault tolerance, and service limits. The **cost optimization** category identifies low-utilization EC2 instances, idle RDS instances, unassociated Elastic IPs, idle load balancers, and underutilized EBS volumes. Full access to all Trusted Advisor checks requires a **Business** or **Enterprise** support plan.",
        },
        {
          type: "callout",
          variant: "tip",
          title: "Automate Waste Detection",
          text: "Use AWS Config rules and AWS Lambda to automatically tag or stop idle resources. For example, a Lambda triggered by EventBridge can stop EC2 instances that fail a CloudWatch utilization threshold for 7 consecutive days in non-production accounts.",
        },
      ],
      flashcards: [
        {
          id: "m2-cost-optimization-intro-01",
          moduleId: "2",
          front:
            "What is the correct order of the cost optimization hierarchy?",
          back: "1) Eliminate waste (unused resources), 2) Right-size (match size to demand), 3) Apply commitment discounts (RIs and Savings Plans), 4) Use Spot/preemptible capacity where interruption is tolerable.",
          tags: ["cost-optimization", "hierarchy"],
        },
        {
          id: "m2-cost-optimization-intro-02",
          moduleId: "2",
          front:
            "What does AWS Compute Optimizer analyze and what does it produce?",
          back: "Compute Optimizer analyzes CloudWatch metrics for EC2 instances, Lambda functions, EBS volumes, ECS on Fargate, and Auto Scaling Groups using ML. It produces instance type and configuration recommendations with projected savings.",
          tags: ["compute-optimizer", "right-sizing"],
        },
        {
          id: "m2-cost-optimization-intro-03",
          moduleId: "2",
          front:
            "What AWS support plan is required to access all AWS Trusted Advisor cost optimization checks?",
          back: "Business or Enterprise support plan. Only a limited set of core Trusted Advisor checks are available on the Basic and Developer support plans.",
          tags: ["trusted-advisor", "support-plan"],
        },
        {
          id: "m2-cost-optimization-intro-04",
          moduleId: "2",
          front:
            "Name three common forms of AWS resource waste that should be eliminated.",
          back: "1) Unattached EBS volumes, 2) Unused Elastic IP addresses (charged hourly when not associated with a running instance), 3) Idle NAT Gateways (charged per hour plus per GB even with no traffic).",
          tags: ["waste", "cost-optimization", "ebs", "elastic-ip"],
        },
      ],
    },
    {
      id: "cost-allocation",
      title: "Cost Allocation & Showback",
      estimatedMinutes: 12,
      blocks: [
        {
          type: "heading",
          level: 2,
          text: "Why Cost Allocation Matters",
        },
        {
          type: "paragraph",
          text: "Without cost allocation, cloud spend appears as a single number owned by a central IT or platform team. Allocating costs to the teams, products, or business units that generate them creates accountability — teams make better architectural decisions when they see the financial impact of their choices.",
        },
        {
          type: "heading",
          level: 2,
          text: "Cost Allocation Tags",
        },
        {
          type: "paragraph",
          text: "AWS allows you to activate **user-defined tags** and **AWS-generated tags** for cost allocation in the Billing and Cost Management console. Once activated, tags appear in **Cost Explorer** and the **Cost and Usage Report (CUR)** as filterable dimensions. Tag activation can take up to 24 hours to propagate, and tags only appear on costs incurred after activation.",
        },
        {
          type: "callout",
          variant: "important",
          title: "Tags Are Not Retroactive",
          text: "Activating a tag today does not apply it to historical charges. Costs incurred before a tag was activated on a resource will appear untagged. Plan your tagging strategy before provisioning resources to avoid unallocated spend.",
        },
        {
          type: "heading",
          level: 2,
          text: "Showback vs. Chargeback",
        },
        {
          type: "table",
          headers: ["Model", "Definition", "Financial Impact", "Best For"],
          rows: [
            [
              "Showback",
              "Report cloud costs to teams for visibility only; no actual money moves",
              "None — informational",
              "Early FinOps maturity; building awareness",
            ],
            [
              "Chargeback",
              "Teams are invoiced or have budgets debited for their actual cloud usage",
              "Real P&L impact on the business unit",
              "Mature FinOps; teams with dedicated cloud budgets",
            ],
            [
              "Amortized Chargeback",
              "Spread upfront RI/SP costs across the reservation period rather than charging at purchase",
              "Smoothed cost for teams",
              "Organizations with significant commitment purchases",
            ],
          ],
        },
        {
          type: "heading",
          level: 2,
          text: "AWS Cost Categories for Allocation",
        },
        {
          type: "paragraph",
          text: "**AWS Cost Categories** provide a billing-layer mechanism to group costs when tagging is incomplete or when costs must be split across multiple teams. Rules can map linked accounts, tag values, services, and charge types into named categories. Cost Category values appear in Cost Explorer and CUR.",
        },
        {
          type: "bullet-list",
          items: [
            "Split shared costs (e.g., support fees, shared infrastructure) proportionally using Cost Category split charge rules",
            "Create a category for unallocated spend to make the gap visible and drive tagging improvement",
            "Category rules are applied retroactively up to the last 12 months when rules change",
            "Up to 50 Cost Categories and 100 rules per category are supported",
          ],
        },
        {
          type: "heading",
          level: 2,
          text: "Multi-Account Strategies for Allocation",
        },
        {
          type: "paragraph",
          text: "Many organizations use **AWS Organizations** with separate linked accounts per team, environment, or product. Account-level separation provides the cleanest cost allocation boundary — all charges in an account are unambiguously owned by that team — but requires more account management overhead than tag-based allocation.",
        },
        {
          type: "callout",
          variant: "tip",
          title: "Hybrid Approach",
          text: "Most mature organizations use account-level separation for major business units combined with tags for finer-grained allocation within accounts. For example: one AWS account per product team, with tags distinguishing environments (prod vs. dev) within each account.",
        },
      ],
      flashcards: [
        {
          id: "m2-cost-allocation-01",
          moduleId: "2",
          front: "What is the difference between showback and chargeback?",
          back: "Showback reports cloud costs to teams for visibility only — no money moves. Chargeback actually debits team budgets or invoices business units for their AWS usage, creating real financial accountability.",
          tags: ["showback", "chargeback", "cost-allocation"],
        },
        {
          id: "m2-cost-allocation-02",
          moduleId: "2",
          front: "Are AWS cost allocation tags retroactive?",
          back: "No. Activating a tag in the Billing console only applies it to costs incurred after activation. Historical costs before tag activation appear untagged in Cost Explorer and CUR. Allow up to 24 hours for propagation.",
          tags: ["tagging", "cost-allocation", "retroactive"],
        },
        {
          id: "m2-cost-allocation-03",
          moduleId: "2",
          front: "What are AWS Cost Category split charge rules used for?",
          back: "Split charge rules allocate shared costs (like AWS Support fees or shared infrastructure) proportionally across multiple Cost Categories based on even split, fixed percentage, or proportional share of other costs.",
          tags: ["cost-categories", "split-charges", "shared-costs"],
        },
        {
          id: "m2-cost-allocation-04",
          moduleId: "2",
          front:
            "What is the cleanest cost allocation boundary in AWS and what is its trade-off?",
          back: "Separate AWS accounts per team or product provide the cleanest boundary — all charges are unambiguously owned. The trade-off is higher account management overhead compared to tag-based allocation within a single account.",
          tags: ["aws-organizations", "linked-accounts", "cost-allocation"],
        },
      ],
    },
    {
      id: "aws-pricing-models",
      title: "AWS Pricing Models",
      estimatedMinutes: 12,
      blocks: [
        {
          type: "heading",
          level: 2,
          text: "Overview of AWS Pricing Models",
        },
        {
          type: "paragraph",
          text: "AWS offers multiple pricing models to balance flexibility and cost. The right model depends on workload predictability, commitment willingness, and interruption tolerance. Using the wrong pricing model is one of the most common sources of unnecessary cloud spend.",
        },
        {
          type: "heading",
          level: 2,
          text: "On-Demand Pricing",
        },
        {
          type: "paragraph",
          text: "**On-Demand** instances are billed per second (Linux) or per hour (Windows) with no upfront commitment. They provide maximum flexibility and are appropriate for unpredictable workloads, short-term experiments, and new application development. On-Demand is the baseline price — all discount models are expressed as a percentage off On-Demand.",
        },
        {
          type: "heading",
          level: 2,
          text: "Reserved Instances (RIs)",
        },
        {
          type: "paragraph",
          text: "Reserved Instances provide a billing discount (up to 72% vs. On-Demand) in exchange for committing to a specific instance family, OS, and region for 1 or 3 years. RIs are a capacity reservation and billing discount — the EC2 instance still runs normally, but the hourly charge is reduced.",
        },
        {
          type: "table",
          headers: [
            "RI Type",
            "Flexibility",
            "Max Discount",
            "Key Characteristic",
          ],
          rows: [
            [
              "Standard RI",
              "Fixed instance family, OS, and region",
              "Up to 72% vs. On-Demand",
              "Cannot change instance family; can be sold on the RI Marketplace",
            ],
            [
              "Convertible RI",
              "Can exchange for different instance family, OS, or tenancy",
              "Up to 66% vs. On-Demand",
              "More flexible; cannot be sold on RI Marketplace",
            ],
            [
              "Scheduled RI",
              "Reserved for specific time windows (deprecated)",
              "Variable",
              "No longer available for new purchases",
            ],
          ],
        },
        {
          type: "heading",
          level: 2,
          text: "Savings Plans",
        },
        {
          type: "paragraph",
          text: "**Savings Plans** are a more flexible commitment model than RIs. You commit to a consistent amount of compute usage in **dollars per hour** (not instance type or region) for 1 or 3 years. AWS automatically applies the Savings Plans discount to eligible usage up to your hourly commitment.",
        },
        {
          type: "table",
          headers: [
            "Savings Plan Type",
            "Applies To",
            "Max Discount",
            "Flexibility",
          ],
          rows: [
            [
              "Compute Savings Plans",
              "EC2 (any family, region, OS, tenancy), Lambda, Fargate",
              "Up to 66% vs. On-Demand",
              "Highest — no instance family or region lock-in",
            ],
            [
              "EC2 Instance Savings Plans",
              "EC2 within a specific instance family in a specific region",
              "Up to 72% vs. On-Demand",
              "Lower — locked to instance family and region",
            ],
            [
              "SageMaker Savings Plans",
              "Amazon SageMaker ML instances",
              "Up to 64% vs. On-Demand",
              "Applies across SageMaker instance types and regions",
            ],
          ],
        },
        {
          type: "heading",
          level: 2,
          text: "Spot Instances",
        },
        {
          type: "paragraph",
          text: "**Spot Instances** use spare EC2 capacity and provide discounts of up to **90% vs. On-Demand**. AWS can reclaim Spot Instances with a 2-minute warning when capacity is needed. Spot is ideal for fault-tolerant, stateless, or batch workloads such as data processing, rendering, and CI/CD pipelines.",
        },
        {
          type: "callout",
          variant: "warning",
          title: "Spot Instance Interruption",
          text: "Spot Instances can be interrupted by AWS with only a 2-minute warning. Never run stateful or latency-sensitive production workloads exclusively on Spot. Use Spot in combination with On-Demand or Savings Plans (mixed instance groups) for resilient architectures.",
        },
        {
          type: "callout",
          variant: "info",
          title: "Savings Plans vs. Reserved Instances — Which to Choose?",
          text: "Savings Plans are preferred for most new commitments because they are more flexible (no instance family lock-in for Compute SP). Standard RIs offer the same or higher discount for EC2 and can be sold on the RI Marketplace if unused. Organizations with very stable, specific EC2 fleets may prefer Standard RIs.",
        },
      ],
      flashcards: [
        {
          id: "m2-aws-pricing-models-01",
          moduleId: "2",
          front:
            "What is the maximum discount available with Spot Instances compared to On-Demand?",
          back: "Up to 90% off On-Demand pricing. Spot Instances use spare EC2 capacity and can be interrupted with a 2-minute warning when AWS needs the capacity back.",
          tags: ["spot-instances", "pricing", "discounts"],
        },
        {
          id: "m2-aws-pricing-models-02",
          moduleId: "2",
          front:
            "What is the key difference between a Standard RI and a Convertible RI?",
          back: "Standard RIs offer up to 72% discount but cannot change instance family and can be sold on the RI Marketplace. Convertible RIs offer up to 66% discount but allow exchange for different instance families, OS, or tenancy — and cannot be sold on the RI Marketplace.",
          tags: ["reserved-instances", "standard-ri", "convertible-ri"],
        },
        {
          id: "m2-aws-pricing-models-03",
          moduleId: "2",
          front: "How do Savings Plans commitments work?",
          back: "You commit to a specific dollar amount of compute usage per hour (e.g., $10/hr) for 1 or 3 years. AWS applies the discount automatically to eligible usage up to your hourly commitment. Unlike RIs, you commit to spend, not to a specific instance type.",
          tags: ["savings-plans", "commitments", "pricing"],
        },
        {
          id: "m2-aws-pricing-models-04",
          moduleId: "2",
          front:
            "Which Savings Plan type offers the most flexibility, and what services does it cover?",
          back: "Compute Savings Plans offer the most flexibility — they apply to EC2 (any instance family, region, OS, tenancy), AWS Lambda, and AWS Fargate. They offer up to 66% savings vs. On-Demand.",
          tags: ["compute-savings-plans", "savings-plans", "flexibility"],
        },
      ],
    },
    {
      id: "carbon-emissions",
      title: "Carbon Emissions & Sustainability",
      estimatedMinutes: 8,
      blocks: [
        {
          type: "heading",
          level: 2,
          text: "Cloud Sustainability and FinOps",
        },
        {
          type: "paragraph",
          text: "Sustainability is increasingly part of the cloud financial conversation. Cloud efficiency and carbon efficiency are closely correlated — underutilized resources waste both money and energy. FinOps practices that reduce waste and improve utilization also reduce an organization's cloud carbon footprint.",
        },
        {
          type: "heading",
          level: 2,
          text: "AWS Customer Carbon Footprint Tool",
        },
        {
          type: "paragraph",
          text: "The **AWS Customer Carbon Footprint Tool** (available in the AWS Billing console) shows estimated carbon emissions (in metric tons of CO2 equivalent, or MTCO2e) for your AWS usage. It breaks down emissions by service and region, and shows a trend over time. AWS also shows the estimated emissions if the same workload ran in an on-premises data center — typically significantly higher.",
        },
        {
          type: "callout",
          variant: "info",
          title: "Why AWS Emissions Are Lower",
          text: "AWS data centers operate at much higher utilization rates than typical enterprise data centers, use renewable energy at scale, and achieve better power usage effectiveness (PUE). AWS publishes an annual Sustainability Report with renewable energy percentages by region.",
        },
        {
          type: "heading",
          level: 2,
          text: "Sustainability Pillar of the AWS Well-Architected Framework",
        },
        {
          type: "paragraph",
          text: "The **Sustainability Pillar** was added to the AWS Well-Architected Framework in 2021. It provides guidance on minimizing the environmental impact of cloud workloads through six design principles.",
        },
        {
          type: "bullet-list",
          items: [
            "**Understand your impact**: establish carbon metrics and track them like cost KPIs",
            "**Establish sustainability goals**: set targets for energy efficiency and carbon reduction",
            "**Maximize utilization**: run instances at higher utilization to reduce per-unit carbon",
            "**Anticipate and adopt more efficient hardware**: use newer Graviton-based instances which offer better performance per watt",
            "**Use managed services**: AWS managed services (RDS, DynamoDB, Lambda) share infrastructure across customers, reducing per-workload carbon",
            "**Reduce downstream impact**: optimize data transfer, image sizes, and client-side efficiency",
          ],
        },
        {
          type: "heading",
          level: 2,
          text: "Region Selection for Lower Carbon",
        },
        {
          type: "paragraph",
          text: "AWS regions differ in their carbon intensity based on the local electrical grid and renewable energy mix. Regions with higher renewable energy percentages produce fewer carbon emissions per kWh. When workload latency requirements permit, choosing a lower-carbon region can meaningfully reduce environmental impact.",
        },
        {
          type: "table",
          headers: [
            "Region Characteristic",
            "Example Regions",
            "Carbon Implication",
          ],
          rows: [
            [
              "High renewable energy mix",
              "EU (Frankfurt), EU (Ireland), US West (Oregon)",
              "Lower carbon per kWh; preferred for sustainability goals",
            ],
            [
              "Mixed or fossil-heavy grid",
              "Varies by local utility",
              "Higher carbon intensity; offset requires REC purchases",
            ],
            [
              "AWS renewable commitments",
              "All regions (long-term goal)",
              "AWS targets 100% renewable energy by 2025 (achieved ahead of schedule in 2023)",
            ],
          ],
        },
        {
          type: "callout",
          variant: "tip",
          title: "Graviton Instances and Sustainability",
          text: "AWS Graviton3 processors deliver up to 60% better performance per watt compared to equivalent x86 instances. Migrating workloads to Graviton-based instances (M7g, C7g, R7g) simultaneously reduces cost and carbon footprint.",
        },
      ],
      flashcards: [
        {
          id: "m2-carbon-emissions-01",
          moduleId: "2",
          front: "What does the AWS Customer Carbon Footprint Tool measure?",
          back: "Estimated carbon emissions in metric tons of CO2 equivalent (MTCO2e) for your AWS usage, broken down by service and region. It also compares your cloud emissions against the estimated footprint of equivalent on-premises infrastructure.",
          tags: ["carbon-footprint", "sustainability", "aws-tools"],
        },
        {
          id: "m2-carbon-emissions-02",
          moduleId: "2",
          front:
            "When was the Sustainability Pillar added to the AWS Well-Architected Framework?",
          back: "In 2021. It is the sixth pillar, alongside Operational Excellence, Security, Reliability, Performance Efficiency, and Cost Optimization.",
          tags: ["well-architected", "sustainability"],
        },
        {
          id: "m2-carbon-emissions-03",
          moduleId: "2",
          front:
            "Why do AWS Graviton instances improve both cost and sustainability?",
          back: "AWS Graviton3 processors deliver up to 60% better performance per watt than equivalent x86 instances. Lower energy consumption per workload reduces both electricity costs and carbon emissions.",
          tags: ["graviton", "sustainability", "cost-optimization"],
        },
        {
          id: "m2-carbon-emissions-04",
          moduleId: "2",
          front: "How does region selection affect cloud carbon emissions?",
          back: "AWS regions differ in the carbon intensity of their electrical grids. Regions with higher renewable energy percentages (e.g., Oregon, Ireland, Frankfurt) have lower carbon per kWh. When latency permits, selecting a lower-carbon region reduces environmental impact.",
          tags: ["regions", "carbon", "sustainability", "renewable-energy"],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "m2-q1",
      text: "In the cost optimization hierarchy, what is the correct order of steps from highest to lowest impact?",
      options: [
        "Right-size → Eliminate waste → Apply commitment discounts → Use Spot",
        "Eliminate waste → Right-size → Apply commitment discounts → Use Spot",
        "Apply commitment discounts → Right-size → Eliminate waste → Use Spot",
        "Use Spot → Eliminate waste → Right-size → Apply commitment discounts",
      ],
      correctIndex: 1,
      explanation:
        "The correct order is: Eliminate waste first (unused resources provide no value), then Right-size (match resources to demand), then apply commitment discounts (RIs and Savings Plans for stable workloads), and finally use Spot for interruption-tolerant workloads. Starting with commitments before eliminating waste can lock in spend on resources that should be deleted.",
    },
    {
      id: "m2-q2",
      text: "A team wants to allocate cloud costs to business units but many resources are missing tags from before their tagging policy was enforced. Which AWS feature can help allocate these untagged costs without re-tagging?",
      options: [
        "AWS Config tag remediation rules",
        "AWS Cost Categories with account-level rules",
        "AWS Resource Groups",
        "AWS Service Catalog portfolios",
      ],
      correctIndex: 1,
      explanation:
        "AWS Cost Categories can map entire linked accounts (or combinations of accounts, services, and charge types) into named categories at the billing layer — no resource re-tagging required. This is the primary use case for Cost Categories: allocating costs when tagging is incomplete, using account-level boundaries as a proxy.",
    },
    {
      id: "m2-q3",
      text: "Which Savings Plan type provides the highest flexibility by covering EC2 across any instance family and region, plus Lambda and Fargate?",
      options: [
        "EC2 Instance Savings Plans",
        "SageMaker Savings Plans",
        "Compute Savings Plans",
        "Standard Reserved Instances",
      ],
      correctIndex: 2,
      explanation:
        "Compute Savings Plans offer the highest flexibility among commitment discount options. They apply to EC2 regardless of instance family, region, OS, or tenancy, and also cover AWS Lambda and AWS Fargate. They offer up to 66% savings vs. On-Demand. EC2 Instance Savings Plans are locked to a specific instance family and region but offer up to 72% savings.",
    },
    {
      id: "m2-q4",
      text: "A Standard Reserved Instance is no longer needed 18 months into a 3-year term. What option is available that is NOT available for Convertible RIs?",
      options: [
        "Exchange it for a different instance family",
        "Convert it to a Savings Plan",
        "Sell it on the AWS Reserved Instance Marketplace",
        "Apply it to a different AWS region",
      ],
      correctIndex: 2,
      explanation:
        "Standard Reserved Instances can be listed for sale on the AWS Reserved Instance Marketplace, allowing you to recover some value for unused commitment. Convertible RIs cannot be sold on the RI Marketplace. Neither RI type can be directly converted to a Savings Plan.",
    },
    {
      id: "m2-q5",
      text: "What does the AWS Customer Carbon Footprint Tool report, and where is it accessed?",
      options: [
        "Power usage effectiveness (PUE) of AWS data centers; accessed via AWS Support",
        "Estimated CO2 equivalent emissions for your AWS usage by service and region; accessed via the AWS Billing and Cost Management console",
        "Renewable energy certificates (RECs) purchased by AWS; accessed via AWS Organizations",
        "Carbon offsets applied to your account; accessed via AWS Marketplace",
      ],
      correctIndex: 1,
      explanation:
        "The AWS Customer Carbon Footprint Tool is available in the AWS Billing and Cost Management console. It shows your estimated carbon emissions in metric tons of CO2 equivalent (MTCO2e), broken down by service and region, and compares your cloud footprint to the estimated footprint of equivalent on-premises infrastructure.",
    },
  ],
};
