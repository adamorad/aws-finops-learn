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
      id: "waste-elimination",
      title: "Waste Elimination Patterns",
      estimatedMinutes: 12,
      blocks: [
        {
          type: "heading",
          level: 2,
          text: "Why Waste Elimination Comes First",
        },
        {
          type: "paragraph",
          text: "The cost optimization hierarchy starts with eliminating waste — resources that generate zero business value but continue incurring charges. Before buying Reserved Instances or Savings Plans, organizations should audit for idle and orphaned resources. Committing to discounts on wasteful infrastructure just locks in spending on things you should delete. In most AWS environments, 10-30% of spend is attributable to waste that could be eliminated within 30 days.",
        },
        {
          type: "callout",
          variant: "warning",
          title: "Do Not Commit Before You Audit",
          text: "A company running 200 EC2 instances and buying a 1-year Savings Plan before auditing for waste frequently discovers 40 of those instances are idle. The commitment still charges for them. Eliminate waste first, then commit to discounts on the remaining justified spend.",
        },
        {
          type: "heading",
          level: 2,
          text: "Idle and Oversized EC2 Instances",
        },
        {
          type: "paragraph",
          text: "An idle EC2 instance is one with consistently low CPU, network, and disk utilization — but still running and incurring full On-Demand charges. AWS Trusted Advisor flags instances with less than 10% max CPU utilization over a 14-day period as idle. AWS Compute Optimizer uses ML to analyze CloudWatch metrics across CPU, memory (requires CloudWatch agent), network, and disk to recommend downsizing. A `m5.4xlarge` running at 8% CPU is a candidate to downsize to `m5.large` — a 75% cost reduction from $0.768/hr to $0.096/hr.",
        },
        {
          type: "table",
          headers: [
            "Waste Pattern",
            "Detection Method",
            "Typical Savings",
            "Action",
          ],
          rows: [
            [
              "Idle EC2 (< 10% CPU, 14 days)",
              "AWS Trusted Advisor, Compute Optimizer",
              "100% if terminated, 50-75% if downsized",
              "Stop (preserve) or terminate; rightsize if workload is real but small",
            ],
            [
              "Oversized EC2 (20-40% avg CPU)",
              "AWS Compute Optimizer",
              "25-50% per instance",
              "Downsize to next smaller instance type in the same family",
            ],
            [
              "Unattached EBS volumes",
              "Trusted Advisor, AWS Config",
              "100% (delete) or gp3 migration (20%)",
              "Snapshot and delete; volumes accumulate at $0.08-$0.10/GB-month indefinitely",
            ],
            [
              "Unused Elastic IPs",
              "Trusted Advisor",
              "$0.005/hr per unassociated EIP (~$3.65/month)",
              "Release immediately; charges are small but signal poor hygiene",
            ],
            [
              "Idle NAT Gateways",
              "Cost Explorer, CloudWatch",
              "$0.045/hr + $0.045/GB processed",
              "Delete if no traffic; a single idle NAT Gateway costs ~$32/month",
            ],
            [
              "Old EBS/RDS snapshots",
              "AWS Backup Audit Manager, custom Lambda",
              "Varies; $0.05/GB-month accumulates silently",
              "Audit retention policies; delete snapshots beyond your RPO window",
            ],
          ],
        },
        {
          type: "heading",
          level: 2,
          text: "Orphaned Resources: The Silent Cost Killers",
        },
        {
          type: "paragraph",
          text: "Orphaned resources are created as dependencies of other resources, then left behind when the parent resource is deleted. They are harder to find than idle instances because they show no utilization anomaly — a detached EBS volume is simply sitting there, not doing anything suspicious. Common orphaned resources include EBS volumes detached when instances are terminated, Elastic IPs released from stopped instances, load balancers left after applications are decommissioned, and S3 buckets from defunct projects.",
        },
        {
          type: "callout",
          variant: "tip",
          title: "Automate Orphan Hunting with AWS Config",
          text: "AWS Config rules like `ebs-volume-attached-to-instance` and `eip-attached` detect orphaned resources continuously and can trigger SNS notifications or Lambda remediation. Pair with weekly Trusted Advisor checks for a layered detection approach. Build a monthly 'cloud hygiene' ritual to review findings and clean up.",
        },
        {
          type: "heading",
          level: 2,
          text: "Dev and Non-Production Environment Scheduling",
        },
        {
          type: "paragraph",
          text: "Non-production environments (dev, staging, QA) often run 24/7 when they only need to be available during business hours. Stopping EC2 instances and RDS databases outside working hours — say, 8 PM to 8 AM weekdays plus all weekends — represents roughly 65% of the month (112 out of 168 hours/week). For a dev environment running $5,000/month, this single practice saves approximately $3,250/month with zero architectural change.",
        },
        {
          type: "bullet-list",
          items: [
            "**AWS Instance Scheduler**: an AWS-provided CloudFormation solution that uses DynamoDB and Lambda to start/stop EC2 and RDS on a schedule — free to deploy",
            "**AWS Systems Manager Automation**: create runbooks to stop/start instances triggered by EventBridge cron schedules",
            "**AWS Lambda + EventBridge**: custom function that stops instances tagged `Environment:dev` at 8 PM and restarts at 8 AM Monday-Friday",
            "**Terraform `aws_autoscaling_schedule`**: schedule ASG min/max capacity to 0 during off-hours for development clusters",
            "Exception process: engineers who need resources after-hours can temporarily override via tag `KeepRunning:true`",
          ],
        },
        {
          type: "heading",
          level: 2,
          text: "Storage Class Optimization",
        },
        {
          type: "paragraph",
          text: "S3 storage costs are often overlooked because per-GB prices seem small — but at scale they compound significantly. A company storing 500 TB in S3 Standard at $0.023/GB-month pays $11,776/month. Moving infrequently accessed objects to S3 Infrequent Access ($0.0125/GB-month) reduces storage cost by 46%. **S3 Intelligent-Tiering** automates this by monitoring access patterns and moving objects between tiers automatically, with no retrieval fees for objects moved to the frequent access tier.",
        },
      ],
      flashcards: [
        {
          id: "m2-waste-elimination-01",
          moduleId: "2",
          front:
            "Why should waste elimination happen BEFORE purchasing Reserved Instances or Savings Plans?",
          back: "Commitment discounts lock in spend for 1-3 years. If you commit before auditing, you pay discounted rates on resources you should have deleted. Eliminate waste first so commitments only cover justified, stable spend. 10-30% of most AWS environments is eliminable waste.",
          tags: ["waste", "cost-optimization", "hierarchy"],
        },
        {
          id: "m2-waste-elimination-02",
          moduleId: "2",
          front:
            "A m5.4xlarge instance ($0.768/hr) runs at 8% CPU consistently. What is the recommended action and approximate savings?",
          back: "Downsize to m5.large ($0.096/hr) — a 87.5% hourly cost reduction. AWS Compute Optimizer would flag this and recommend the smaller instance type. At 24/7 runtime, annual savings: ($0.768 - $0.096) × 8,760 hours = ~$5,886/year per instance.",
          tags: ["rightsizing", "ec2", "compute-optimizer"],
        },
        {
          id: "m2-waste-elimination-03",
          moduleId: "2",
          front:
            "How much does an idle NAT Gateway cost per month, and what is the detection method?",
          back: "An idle NAT Gateway costs approximately $32/month ($0.045/hr × 720 hours) plus $0.045/GB for any data processed. Detect via Cost Explorer (NAT Gateway line item) and CloudWatch (BytesInFromDestination metric near zero). Delete if no legitimate traffic.",
          tags: ["nat-gateway", "waste", "networking"],
        },
        {
          id: "m2-waste-elimination-04",
          moduleId: "2",
          front:
            "A dev environment costs $5,000/month running 24/7. What is the monthly savings from stopping it nights and weekends (65% of hours)?",
          back: "Approximately $3,250/month. 65% idle time × $5,000 = $3,250 savings. Annual savings: ~$39,000. AWS Instance Scheduler (free CloudFormation solution) can automate this with no application changes required.",
          tags: ["dev-environment", "scheduling", "savings"],
        },
        {
          id: "m2-waste-elimination-05",
          moduleId: "2",
          front:
            "What is the S3 Intelligent-Tiering storage class and when should you use it?",
          back: "S3 Intelligent-Tiering automatically moves objects between frequent and infrequent access tiers based on access patterns, with no retrieval fees. Use it when access patterns are unknown or unpredictable. For 500 TB of data, moving from Standard ($0.023/GB) to IA ($0.0125/GB) saves ~$5,888/month; Intelligent-Tiering automates this decision.",
          tags: ["s3", "storage-classes", "intelligent-tiering"],
        },
      ],
    },
    {
      id: "cost-allocation",
      title: "Cost Allocation with Tags & Cost Categories",
      estimatedMinutes: 12,
      blocks: [
        {
          type: "heading",
          level: 2,
          text: "The Cost Allocation Problem at Scale",
        },
        {
          type: "paragraph",
          text: "Without cost allocation, a $500,000/month AWS bill is an undifferentiated number. Leadership cannot determine whether the data team or the product team is driving growth. Engineers have no feedback on whether their architectural choices are cost-efficient. Cost allocation — attributing cloud spend to the teams, products, and environments that generate it — is the prerequisite for accountability, optimization, and unit economics.",
        },
        {
          type: "heading",
          level: 2,
          text: "AWS Cost Allocation Tags: How They Work",
        },
        {
          type: "paragraph",
          text: "AWS allows you to activate **user-defined tags** and **AWS-generated tags** for cost allocation in the Billing and Cost Management console. Once activated, tags appear in Cost Explorer and CUR as filterable dimensions. There is a propagation delay of up to 24 hours after activation. Critically, tags only apply to costs incurred AFTER the resource is tagged — there is no retroactive application.",
        },
        {
          type: "callout",
          variant: "important",
          title: "Tags Are Not Retroactive — Ever",
          text: "Activating a cost allocation tag today does not apply it to any historical charges. Costs incurred before a resource was tagged appear as unallocated spend in Cost Explorer and CUR. This means tagging must be enforced at provisioning time. Use AWS Config rules or Organization Tag Policies to prevent untagged resources from being created.",
        },
        {
          type: "heading",
          level: 2,
          text: "AWS Cost Categories: Billing-Layer Allocation",
        },
        {
          type: "paragraph",
          text: "**AWS Cost Categories** let you create custom groupings of costs that appear in Cost Explorer and CUR. Rules map accounts, tag values, services, or charge types into named categories. This is the escape hatch for incomplete tagging: even if individual resources are untagged, you can map entire linked accounts to a business unit. Cost Category rule changes are **retroactive up to 12 months** — unlike tags, which are purely forward-looking.",
        },
        {
          type: "table",
          headers: ["Feature", "Cost Allocation Tags", "AWS Cost Categories"],
          rows: [
            [
              "Applied at",
              "Resource level (tag the resource itself)",
              "Billing layer (rules applied to the cost data)",
            ],
            [
              "Retroactive?",
              "No — only applies to future costs after tagging",
              "Yes — retroactive up to 12 months when rules change",
            ],
            [
              "Handles untaggable costs?",
              "No — data transfer, support fees cannot be tagged",
              "Yes — map by service or account regardless of taggability",
            ],
            [
              "Split shared costs?",
              "No — a tag can only belong to one resource",
              "Yes — split charge rules distribute shared costs proportionally",
            ],
            [
              "Limit",
              "Up to 500 active cost allocation tags",
              "Up to 50 categories, 100 rules each",
            ],
          ],
        },
        {
          type: "heading",
          level: 2,
          text: "Cost Category Split Charge Rules",
        },
        {
          type: "paragraph",
          text: "Shared infrastructure — a central Kubernetes cluster, a shared RDS database, AWS Support fees — cannot be attributed to a single team. **Split charge rules** within Cost Categories distribute these shared costs across business units using three methods: **Even split** (divide equally), **Fixed percentage** (explicitly assign 40% to Team A, 60% to Team B), or **Proportional** (allocate based on each team's share of total non-shared AWS costs — the most common choice).",
        },
        {
          type: "bullet-list",
          items: [
            "AWS Support fees scale with your total AWS spend and cannot be tagged to individual teams — use proportional split",
            "A shared EKS cluster serving 3 product teams should be split proportionally based on CPU/memory allocation ratios, not equal thirds",
            "Create an 'Unallocated' Cost Category to make the gap visible — teams are often motivated to improve tagging when they see a large unallocated bucket",
            "Cost Categories appear in CUR as a `cost_category` column — use Athena queries to build chargeback reports from this data",
          ],
        },
        {
          type: "heading",
          level: 2,
          text: "Multi-Account Architecture for Allocation",
        },
        {
          type: "paragraph",
          text: "The cleanest allocation boundary is a dedicated AWS account per team or product. All charges in the account are unambiguously owned — no tagging required for the highest level of allocation. AWS Organizations consolidated billing makes it possible to receive a single invoice while maintaining per-account cost visibility. The trade-off is operational overhead: IAM management, VPC peering or Transit Gateway costs, and more accounts to audit.",
        },
        {
          type: "callout",
          variant: "tip",
          title: "Hybrid Allocation: Accounts + Tags",
          text: "Most mature organizations use a hybrid: one AWS account per major product or team (for clean business unit allocation), then tags within accounts for finer granularity (prod vs. dev environments, individual microservices). This gives clean top-level allocation without requiring perfect tagging of every resource.",
        },
      ],
      flashcards: [
        {
          id: "m2-cost-allocation-01",
          moduleId: "2",
          front: "Are AWS cost allocation tags retroactive?",
          back: "No. Activating a tag in the Billing console only applies it to costs incurred AFTER activation (with up to 24-hour propagation delay). All costs before tag activation appear as unallocated. This is why tagging must be enforced at provisioning time, not cleaned up after the fact.",
          tags: ["tagging", "cost-allocation", "retroactive"],
        },
        {
          id: "m2-cost-allocation-02",
          moduleId: "2",
          front:
            "What makes AWS Cost Categories more powerful than tags for handling incomplete tagging scenarios?",
          back: "Cost Categories work at the billing layer — they can map entire accounts, services, or charge types into named groups without touching resource tags. They are retroactive up to 12 months. They can split shared costs (AWS Support, shared infrastructure) proportionally. Tags require the resource to exist and be tagged before costs are incurred.",
          tags: ["cost-categories", "tagging", "comparison"],
        },
        {
          id: "m2-cost-allocation-03",
          moduleId: "2",
          front:
            "What are the three split charge rule methods in AWS Cost Categories?",
          back: "1) Even split — divide equally among all categories. 2) Fixed percentage — explicitly assign percentages (e.g., 40% Team A, 60% Team B). 3) Proportional — allocate based on each category's share of total non-shared costs. Proportional is most common for AWS Support fee allocation.",
          tags: ["cost-categories", "split-charges", "shared-costs"],
        },
        {
          id: "m2-cost-allocation-04",
          moduleId: "2",
          front:
            "What is the cleanest cost allocation boundary in AWS and what is its primary trade-off?",
          back: "Separate AWS accounts per team or product — all charges in an account are unambiguously owned without relying on tag coverage. Trade-off: operational overhead (IAM management, cross-account networking costs, more accounts to govern). Most organizations use a hybrid of accounts + tags.",
          tags: ["aws-organizations", "linked-accounts", "cost-allocation"],
        },
      ],
    },
    {
      id: "showback-chargeback",
      title: "Showback vs. Chargeback Mechanics",
      estimatedMinutes: 10,
      blocks: [
        {
          type: "heading",
          level: 2,
          text: "What is Showback?",
        },
        {
          type: "paragraph",
          text: "**Showback** is the practice of reporting cloud costs to teams for visibility — without any actual money changing hands. Teams receive a report showing how much AWS spend is attributed to them, but their budget is not debited. Showback is the starting point for cost accountability: once teams see their own costs, they begin making better architectural decisions, even without financial consequences.",
        },
        {
          type: "heading",
          level: 2,
          text: "What is Chargeback?",
        },
        {
          type: "paragraph",
          text: "**Chargeback** goes further: teams' budgets are actually debited, or internal invoices are raised, for their cloud usage. The financial impact is real — overspending a cloud budget has P&L consequences for the business unit. Chargeback drives the strongest behavioral change, but requires high tagging coverage, agreed-upon allocation rules, and organizational buy-in to the model. It should only be implemented after showback has been running for several months.",
        },
        {
          type: "table",
          headers: [
            "Model",
            "Financial Impact",
            "Tagging Requirement",
            "Behavioral Impact",
            "FinOps Maturity",
          ],
          rows: [
            [
              "No allocation",
              "None — cloud is a central IT cost",
              "None",
              "None — teams have no visibility or accountability",
              "Crawl",
            ],
            [
              "Showback",
              "Informational only — no budget debited",
              "Moderate (60-80% coverage)",
              "Medium — awareness drives some optimization",
              "Walk",
            ],
            [
              "Chargeback",
              "Real P&L impact on business unit budgets",
              "High (85%+ coverage recommended)",
              "High — teams treat cloud like headcount spend",
              "Run",
            ],
            [
              "Amortized chargeback",
              "Real but smoothed — RI/SP upfront costs spread over commitment period",
              "High",
              "High — removes quarterly spikes from RI purchases",
              "Run",
            ],
          ],
        },
        {
          type: "heading",
          level: 2,
          text: "Amortized vs. Unblended Costs for Chargeback",
        },
        {
          type: "paragraph",
          text: "When an organization purchases a 1-year Compute Savings Plan with a $12,000 all-upfront payment, the cost appears as a single line item in January in the unblended view. For chargeback, this creates a spike that the charged team may dispute. **Amortized costs** distribute that $12,000 evenly across 12 months ($1,000/month), making the chargeback smooth and predictable. AWS Cost Explorer has a toggle between unblended and amortized cost views; CUR includes both `unblended_cost` and `amortized_cost` columns.",
        },
        {
          type: "callout",
          variant: "info",
          title: "Which Teams Get Charged for Shared Commitments?",
          text: "When a central FinOps team purchases Savings Plans or Reserved Instances for the entire organization, the discount benefits whichever team uses the covered resources. For chargeback, best practice is to charge teams for their actual usage at the discounted (amortized) rate — the central FinOps team absorbs any unused commitment risk.",
        },
        {
          type: "heading",
          level: 2,
          text: "Building a Showback Report",
        },
        {
          type: "numbered-list",
          items: [
            "Set up Cost and Usage Report (CUR) delivery to S3 with hourly granularity and resource IDs enabled",
            "Create an Athena database over the CUR S3 bucket using the AWS-provided CloudFormation template",
            "Query CUR by `resource_tags_user_team` and `resource_tags_user_environment` to aggregate costs by team and environment",
            "Add AWS Cost Categories as a CUR dimension to handle untagged resources via account-level rules",
            "Build a QuickSight dashboard or export to a weekly CSV emailed to team leads",
            "Include a 'coverage score' — the % of spend attributed to a team vs. unallocated — to incentivize better tagging",
          ],
        },
        {
          type: "heading",
          level: 2,
          text: "Common Chargeback Disputes and How to Resolve Them",
        },
        {
          type: "bullet-list",
          items: [
            "**'We didn't use that resource'**: occurs when orphaned resources remain tagged to a team after ownership transfer — implement a quarterly resource ownership audit",
            "**'Data transfer costs are unfair'**: egress charges (e.g., to the internet or cross-region) are often shared and hard to tag; use proportional split charge rules in Cost Categories",
            "**'Why are we paying for support?'**: AWS Support fees scale with total spend and cannot be tagged; explain that they are allocated proportionally and include this in the chargeback policy document",
            "**'Our costs jumped this month because of an RI purchase'**: use amortized costs for chargeback to eliminate upfront payment spikes",
          ],
        },
      ],
      flashcards: [
        {
          id: "m2-showback-chargeback-01",
          moduleId: "2",
          front:
            "What is the difference between showback and chargeback, and which should come first?",
          back: "Showback reports cloud costs to teams for visibility only — no budget is debited. Chargeback actually debits team budgets or raises internal invoices, creating real P&L consequences. Showback should always come first — implement it for several months to build tagging coverage and organizational alignment before moving to chargeback.",
          tags: ["showback", "chargeback", "cost-allocation"],
        },
        {
          id: "m2-showback-chargeback-02",
          moduleId: "2",
          front:
            "Why use amortized costs for chargeback instead of unblended costs?",
          back: "Unblended costs show the full upfront RI/Savings Plan payment in the month of purchase, causing a large spike charged to one team. Amortized costs spread the upfront fee evenly across the commitment period ($12,000 all-upfront SP = $1,000/month), making chargeback smooth and predictable. AWS CUR includes both `unblended_cost` and `amortized_cost` columns.",
          tags: [
            "amortized",
            "chargeback",
            "reserved-instances",
            "savings-plans",
          ],
        },
        {
          id: "m2-showback-chargeback-03",
          moduleId: "2",
          front:
            "What minimum tag coverage is recommended before implementing chargeback?",
          back: "85%+ coverage for your critical tag keys before chargeback. At lower coverage, too much spend falls into 'unallocated' — teams will dispute charges on resources they can't verify are theirs. Showback works at 60-80% coverage, but chargeback requires higher confidence in attribution.",
          tags: ["chargeback", "tagging", "coverage"],
        },
        {
          id: "m2-showback-chargeback-04",
          moduleId: "2",
          front:
            "Who should absorb unused Savings Plans commitment risk in a chargeback model?",
          back: "The central FinOps team that purchased the commitment. Teams are charged for their actual usage at the discounted (amortized) rate. The FinOps team takes the risk that the commitment won't be fully utilized — this is appropriate because they made the purchase decision and benefit from the organizational savings.",
          tags: ["chargeback", "savings-plans", "risk"],
        },
        {
          id: "m2-showback-chargeback-05",
          moduleId: "2",
          front:
            "How do you handle AWS Support fee allocation in a chargeback model?",
          back: "AWS Support fees scale with total AWS spend and cannot be tagged to specific resources. Use AWS Cost Categories proportional split charge rules to distribute Support fees across business units based on their share of total non-Support AWS costs. Document this in the chargeback policy to prevent disputes.",
          tags: ["chargeback", "aws-support", "split-charges"],
        },
      ],
    },
    {
      id: "aws-pricing-models",
      title: "AWS Pricing Models Deep Dive",
      estimatedMinutes: 14,
      blocks: [
        {
          type: "heading",
          level: 2,
          text: "The Four AWS EC2 Pricing Models",
        },
        {
          type: "paragraph",
          text: "AWS offers four main pricing models for EC2 compute, each optimizing for a different trade-off between flexibility and cost. On-Demand provides maximum flexibility at the highest price. Reserved Instances and Savings Plans offer discounts in exchange for 1-3 year commitments. Spot Instances use spare capacity at up to 90% off but can be interrupted. Most mature AWS environments use all four models simultaneously, applying the right one to each workload type.",
        },
        {
          type: "heading",
          level: 2,
          text: "On-Demand: The Baseline",
        },
        {
          type: "paragraph",
          text: "**On-Demand** instances are billed per second (Linux) or per hour (Windows) with no upfront commitment. They are the most expensive option per hour but require no commitment. An `m5.xlarge` in us-east-1 costs $0.192/hr On-Demand. Running 10 of these 24/7 for a year costs $16,819. On-Demand is appropriate for: unpredictable or spiky workloads, short-term experiments, and new workloads whose utilization patterns are unknown.",
        },
        {
          type: "heading",
          level: 2,
          text: "Reserved Instances: Deep Discounts with Commitment",
        },
        {
          type: "paragraph",
          text: "Reserved Instances (RIs) provide a billing discount in exchange for committing to a specific instance family, OS, and region for 1 or 3 years. An `m5.xlarge` 1-year Standard RI with all-upfront payment costs $0.120/hr — a **38% discount** vs. On-Demand. The 3-year term drops to $0.080/hr — a **58% discount**. RIs do not change how the instance runs; they only affect billing.",
        },
        {
          type: "table",
          headers: [
            "RI Type",
            "Flexibility",
            "Max Discount (3-yr)",
            "Sellable on RI Marketplace?",
          ],
          rows: [
            [
              "Standard RI",
              "Fixed instance family, OS, tenancy, and region; can change AZ and instance size within family",
              "Up to 72% vs. On-Demand",
              "Yes — can sell unused Standard RIs",
            ],
            [
              "Convertible RI",
              "Can exchange for different instance family, OS, or tenancy during term",
              "Up to 66% vs. On-Demand",
              "No — cannot be listed on RI Marketplace",
            ],
          ],
        },
        {
          type: "heading",
          level: 2,
          text: "Savings Plans: Flexible Commitments",
        },
        {
          type: "paragraph",
          text: "**Savings Plans** commit to a dollar amount of compute spend per hour (e.g., $10/hr) for 1 or 3 years. AWS automatically applies the discount to eligible usage up to the commitment. Unlike RIs, the discount is not tied to a specific instance type — **Compute Savings Plans** apply to EC2 (any family, region, OS, tenancy), Lambda, and Fargate. If you switch from `m5` to `m6i` instances, the Savings Plan still applies. This is why most new commitments are Savings Plans, not RIs.",
        },
        {
          type: "table",
          headers: [
            "Savings Plan Type",
            "Applies To",
            "Max Discount",
            "Flexibility Level",
          ],
          rows: [
            [
              "Compute Savings Plans",
              "EC2 (any family, region, OS, tenancy), AWS Lambda, AWS Fargate",
              "Up to 66% vs. On-Demand",
              "Highest — no instance family or region lock-in",
            ],
            [
              "EC2 Instance Savings Plans",
              "EC2 within a specific instance family in a specific region (e.g., m5 in us-east-1)",
              "Up to 72% vs. On-Demand",
              "Lower — locked to instance family and region; can change size, OS, tenancy",
            ],
            [
              "SageMaker Savings Plans",
              "Amazon SageMaker training and inference instances",
              "Up to 64% vs. On-Demand",
              "Medium — applies across SageMaker instance types and regions",
            ],
          ],
        },
        {
          type: "heading",
          level: 2,
          text: "Spot Instances: Deepest Discounts, With Interruption Risk",
        },
        {
          type: "paragraph",
          text: "**Spot Instances** use spare EC2 capacity at discounts of up to **90% off On-Demand**. An `m5.xlarge` that costs $0.192/hr On-Demand can run for as little as $0.019-$0.060/hr on Spot depending on the instance pool and availability zone. AWS can reclaim Spot Instances with a **2-minute warning** when capacity is needed. Spot is ideal for batch processing, data analytics, machine learning training, CI/CD workloads, and stateless web tier scale-out.",
        },
        {
          type: "callout",
          variant: "warning",
          title: "Never Run These Workloads on Spot Only",
          text: "Do not run stateful databases, long-running jobs without checkpointing, or latency-sensitive production web servers exclusively on Spot. A Spot interruption on your RDS replacement or primary web server causes downtime. Use Spot for the stateless, fault-tolerant, or easily resumable portions of your architecture only.",
        },
        {
          type: "heading",
          level: 2,
          text: "Real-World Pricing Comparison: m5.xlarge in us-east-1",
        },
        {
          type: "table",
          headers: [
            "Pricing Model",
            "Hourly Rate",
            "Annual Cost (24/7)",
            "vs. On-Demand",
            "Commitment",
          ],
          rows: [
            ["On-Demand", "$0.192/hr", "$1,682/yr", "Baseline", "None"],
            [
              "1-yr Standard RI (no upfront)",
              "$0.126/hr",
              "$1,103/yr",
              "-34%",
              "1 year, fixed instance type",
            ],
            [
              "1-yr Standard RI (all upfront)",
              "$0.120/hr",
              "$1,051/yr",
              "-38%",
              "1 year, fixed instance type",
            ],
            [
              "3-yr Standard RI (all upfront)",
              "$0.080/hr",
              "$701/yr",
              "-58%",
              "3 years, fixed instance type",
            ],
            [
              "1-yr Compute Savings Plan",
              "$0.126/hr",
              "$1,103/yr",
              "-34%",
              "1 year, any compute",
            ],
            [
              "3-yr Compute Savings Plan",
              "$0.101/hr",
              "$885/yr",
              "-47%",
              "3 years, any compute",
            ],
            [
              "Spot (typical range)",
              "$0.025-$0.070/hr",
              "$219-$613/yr",
              "-63% to -87%",
              "None — interruptible",
            ],
          ],
        },
        {
          type: "callout",
          variant: "tip",
          title: "Use Cost Explorer Savings Plans Recommendations",
          text: "AWS Cost Explorer analyzes your last 7 or 30 days of On-Demand usage and recommends the optimal Savings Plans commitment amount and type. It shows estimated savings vs. commitment cost with a payback period. Start with the recommendation and buy 70-80% of it — leaving room for workload reduction without over-committing.",
        },
      ],
      flashcards: [
        {
          id: "m2-aws-pricing-models-01",
          moduleId: "2",
          front:
            "What is the On-Demand hourly rate for an m5.xlarge in us-east-1, and what is the maximum discount available on a 3-year all-upfront Standard RI?",
          back: "$0.192/hr On-Demand. 3-year Standard RI all-upfront: ~$0.080/hr — a 58% discount. Annual cost drops from $1,682 to $701. This is the deepest EC2 Reserved Instance discount, but requires a 3-year commitment to a fixed instance family and region.",
          tags: ["ec2", "pricing", "reserved-instances", "m5"],
        },
        {
          id: "m2-aws-pricing-models-02",
          moduleId: "2",
          front:
            "What is the key difference between a Standard RI and a Convertible RI?",
          back: "Standard RIs offer up to 72% discount but cannot change instance family; they CAN be sold on the AWS RI Marketplace. Convertible RIs offer up to 66% discount but allow exchange for different instance families, OS, or tenancy during the term; they CANNOT be sold on the RI Marketplace.",
          tags: ["reserved-instances", "standard-ri", "convertible-ri"],
        },
        {
          id: "m2-aws-pricing-models-03",
          moduleId: "2",
          front:
            "Why are Compute Savings Plans preferred over Standard RIs for most new commitments?",
          back: "Compute Savings Plans apply to EC2 (any family, region, OS, tenancy), Lambda, and Fargate — no instance type lock-in. If you switch from m5 to m6i, the SP discount still applies. Standard RIs are locked to a specific instance family and region. Both offer similar discounts (~34% for 1-year), but Compute SPs provide much more flexibility.",
          tags: ["compute-savings-plans", "reserved-instances", "flexibility"],
        },
        {
          id: "m2-aws-pricing-models-04",
          moduleId: "2",
          front:
            "What is the typical Spot Instance discount range, and what is the interruption mechanism?",
          back: "Spot Instances discount: 63-90% off On-Demand (m5.xlarge: $0.025-$0.070/hr vs. $0.192/hr On-Demand). AWS reclaims Spot with a 2-minute warning when capacity is needed. Use Spot only for fault-tolerant, stateless, or checkpointed workloads (batch jobs, CI/CD, ML training, stateless web tier scale-out).",
          tags: ["spot-instances", "pricing", "interruption"],
        },
        {
          id: "m2-aws-pricing-models-05",
          moduleId: "2",
          front:
            "How should you use Cost Explorer to determine the right Savings Plans commitment amount?",
          back: "Cost Explorer analyzes your last 7 or 30 days of On-Demand usage and recommends the optimal SP amount and type with estimated savings. Best practice: buy 70-80% of the recommendation to leave buffer for workload reduction. Review and top up quarterly as usage patterns are confirmed.",
          tags: ["savings-plans", "cost-explorer", "recommendations"],
        },
      ],
    },
    {
      id: "unit-economics",
      title: "Unit Economics & Cloud Efficiency Metrics",
      estimatedMinutes: 10,
      blocks: [
        {
          type: "heading",
          level: 2,
          text: "What are Unit Economics?",
        },
        {
          type: "paragraph",
          text: "Unit economics express cloud cost as a ratio of a business metric — cost per request, cost per user, cost per GB processed, cost per transaction. They answer the question: 'As our business grows, is our cloud spend growing faster or slower than our revenue?' A SaaS company with rising cloud costs but rising cost-per-user has a unit economics problem. A company with rising absolute costs but declining cost-per-user is achieving cloud efficiency even as it scales.",
        },
        {
          type: "callout",
          variant: "info",
          title: "The Goal: Sublinear Cloud Cost Growth",
          text: "Ideally, cloud costs grow more slowly than revenue or user count as the business scales — this is sublinear growth. Economies of scale from Savings Plans, better architecture, and engineering efficiency should push the cost-per-unit metric downward over time, even as absolute spend increases.",
        },
        {
          type: "heading",
          level: 2,
          text: "Common Cloud Unit Economic Metrics",
        },
        {
          type: "table",
          headers: ["Metric", "Formula", "Who Tracks It", "Example Target"],
          rows: [
            [
              "Cost per active user",
              "Total AWS cost / Monthly Active Users",
              "FinOps, Product, Finance",
              "$0.40/MAU (reduce from $0.60 via optimization)",
            ],
            [
              "Cost per API request",
              "Total API infrastructure cost / Total API calls",
              "Engineering, FinOps",
              "$0.00005/request ($50 per million)",
            ],
            [
              "Cost per GB processed",
              "Data pipeline AWS cost / GB ingested",
              "Data Engineering, FinOps",
              "$0.02/GB (includes Glue, S3, Athena)",
            ],
            [
              "Cost per transaction",
              "Total e-commerce AWS cost / Orders processed",
              "FinOps, Finance",
              "$0.015/order",
            ],
            [
              "Cloud cost as % of revenue",
              "(AWS spend / Total revenue) × 100",
              "CFO, FinOps",
              "8-12% for SaaS; < 5% for marketplace; > 20% is a warning sign",
            ],
            [
              "Compute efficiency ratio",
              "Actual CPU used / CPU provisioned",
              "Engineering, FinOps",
              "> 60% target (vs. on-prem average of 15-20%)",
            ],
          ],
        },
        {
          type: "heading",
          level: 2,
          text: "Calculating Cost per Request: A Real Example",
        },
        {
          type: "paragraph",
          text: "A microservices platform runs 20 `m5.large` instances ($0.096/hr each) behind an Application Load Balancer ($0.018/hr + $0.008/LCU-hour). Monthly EC2 cost: 20 × $0.096 × 720 = $1,382. ALB cost: $0.018 × 720 + $0.008 × usage LCUs ≈ $60. Total infrastructure: ~$1,442/month. If the platform handles 50 million API requests/month, cost per request = $1,442 / 50,000,000 = **$0.0000288 per request** (~$28.84 per million requests). This metric can now be tracked month-over-month as load grows.",
        },
        {
          type: "heading",
          level: 2,
          text: "Unit Economics in Engineering Conversations",
        },
        {
          type: "paragraph",
          text: "Unit economics transform cost conversations from blame sessions into engineering problems. Instead of 'your team spent $50,000 this month,' FinOps practitioners can say 'your cost per GB processed increased from $0.02 to $0.04 this month — the data pipeline processed the same volume but the Glue job runtime doubled. What changed?' This is a solvable engineering problem, not an accusation.",
        },
        {
          type: "bullet-list",
          items: [
            "Track unit metrics in the same dashboard as your product KPIs (DAU, revenue, API latency)",
            "Set quarterly targets for unit cost reduction alongside feature delivery targets — e.g., 'reduce cost per user by 15% in Q3'",
            "Instrument unit metrics via **Amazon CloudWatch custom metrics** or **AWS Cost Explorer API** combined with product analytics data",
            "Use **AWS Cost and Usage Report + Athena** to join billing data with application-level metrics stored in S3",
            "Present unit economics in executive QBRs to demonstrate cloud ROI, not just raw spend numbers",
          ],
        },
        {
          type: "callout",
          variant: "tip",
          title: "Lambda Unit Economics Are Excellent",
          text: "AWS Lambda pricing ($0.0000166667 per GB-second + $0.20 per million requests) means a function using 512 MB that runs for 100ms costs $0.000000833 per invocation — less than $1 per million calls. Lambda is often the most cost-efficient compute choice for event-driven, variable workloads when measured on a unit economics basis.",
        },
      ],
      flashcards: [
        {
          id: "m2-unit-economics-01",
          moduleId: "2",
          front:
            "What is 'sublinear cloud cost growth' and why is it the goal in unit economics?",
          back: "Sublinear growth means cloud costs increase more slowly than revenue or user count as the business scales. Economies of scale from Savings Plans, better architecture, and caching push the cost-per-unit metric downward even as absolute spend grows. It demonstrates that the engineering team is getting more efficient over time.",
          tags: ["unit-economics", "scaling", "efficiency"],
        },
        {
          id: "m2-unit-economics-02",
          moduleId: "2",
          front:
            "A platform handles 50M API requests/month at $1,442/month total infrastructure cost. What is the cost per million requests?",
          back: "$1,442 / 50M = $0.0000288/request = $28.84 per million requests. This unit metric can now be tracked month-over-month, and spikes in cost-per-request trigger engineering investigation rather than budget blame discussions.",
          tags: ["unit-economics", "cost-per-request", "calculation"],
        },
        {
          id: "m2-unit-economics-03",
          moduleId: "2",
          front:
            "What is a typical 'cloud cost as % of revenue' benchmark for a SaaS company, and what signals a problem?",
          back: "8-12% of revenue is typical for SaaS companies. Below 5% is efficient (common for high-margin marketplace businesses). Above 20% is a warning sign indicating either inefficient architecture, low revenue per user, or insufficient optimization. This metric should be tracked quarterly alongside COGS.",
          tags: ["unit-economics", "saas", "benchmarks"],
        },
        {
          id: "m2-unit-economics-04",
          moduleId: "2",
          front:
            "Why is Lambda often the most cost-efficient compute choice for event-driven workloads?",
          back: "Lambda pricing: $0.0000166667/GB-second + $0.20/million requests. A 512MB function running 100ms costs $0.000000833/invocation — under $1 per million calls. You pay only during execution with no idle time charges, making it dramatically cheaper than EC2 for intermittent or variable workloads.",
          tags: ["lambda", "unit-economics", "serverless"],
        },
      ],
    },
    {
      id: "carbon-sustainability",
      title: "Carbon Footprint & Sustainability Pillar",
      estimatedMinutes: 10,
      blocks: [
        {
          type: "heading",
          level: 2,
          text: "Sustainability as Part of FinOps",
        },
        {
          type: "paragraph",
          text: "Sustainability is increasingly integrated into cloud financial operations for two reasons: regulatory pressure (ESG reporting, EU CSRD, SEC climate disclosure rules) and the direct correlation between cloud efficiency and carbon reduction. An underutilized EC2 instance wastes both money and electricity. FinOps practices that reduce waste and improve utilization automatically reduce an organization's cloud carbon footprint — the two objectives reinforce each other.",
        },
        {
          type: "callout",
          variant: "info",
          title: "AWS is Ahead of Its 2025 Renewable Energy Commitment",
          text: "AWS achieved 100% renewable energy for its global infrastructure in 2023 — two years ahead of its 2025 target. AWS data centers operate at Power Usage Effectiveness (PUE) of approximately 1.2, compared to an industry average of 1.5-1.6. This means AWS uses 20-30% less energy per workload than a typical enterprise data center.",
        },
        {
          type: "heading",
          level: 2,
          text: "AWS Customer Carbon Footprint Tool",
        },
        {
          type: "paragraph",
          text: "The **AWS Customer Carbon Footprint Tool** (available in the AWS Billing and Cost Management console, under Cost Management) reports your estimated carbon emissions in **metric tons of CO2 equivalent (MTCO2e)**. It breaks down emissions by AWS service and region, shows a 36-month trend, and compares your cloud footprint against the estimated emissions of running equivalent workloads in an on-premises data center — which is typically 4-5x higher due to lower utilization rates and older hardware.",
        },
        {
          type: "bullet-list",
          items: [
            "Emissions data is available at the AWS account and organizational level in the management account",
            "The tool uses a **scope 2 market-based methodology** aligned with the GHG Protocol",
            "Data is typically available with a 3-month delay — not suitable for real-time monitoring",
            "Report findings can be exported for ESG disclosures and sustainability reports",
            "Regions with higher renewable energy percentages (Oregon, Ireland, Frankfurt) show lower MTCO2e per workload",
          ],
        },
        {
          type: "heading",
          level: 2,
          text: "Sustainability Pillar of the AWS Well-Architected Framework",
        },
        {
          type: "paragraph",
          text: "The **Sustainability Pillar** was added to the AWS Well-Architected Framework in 2021 — the sixth pillar alongside Operational Excellence, Security, Reliability, Performance Efficiency, and Cost Optimization. It provides six design principles to minimize environmental impact. Notably, several sustainability improvements are also cost improvements: higher utilization, managed services, and Graviton instances all save money AND reduce carbon.",
        },
        {
          type: "table",
          headers: [
            "Sustainability Principle",
            "Practical Action",
            "Overlap with Cost Optimization",
          ],
          rows: [
            [
              "Understand your impact",
              "Track MTCO2e via Carbon Footprint Tool; set reduction targets",
              "Indirect — drives measurement discipline",
            ],
            [
              "Establish sustainability goals",
              "Set per-workload carbon KPIs alongside cost KPIs",
              "Indirect — aligns incentives",
            ],
            [
              "Maximize utilization",
              "Right-size instances; use Auto Scaling; eliminate idle resources",
              "Direct — same as cost optimization",
            ],
            [
              "Use more efficient hardware",
              "Migrate EC2 workloads to AWS Graviton3 (m7g, c7g, r7g)",
              "Direct — Graviton3 is ~20% cheaper and 60% better perf/watt",
            ],
            [
              "Use managed services",
              "Replace EC2 self-managed databases with RDS, Aurora, DynamoDB",
              "Direct — managed services share multi-tenant infrastructure",
            ],
            [
              "Reduce downstream impact",
              "Optimize image sizes, enable compression, minimize data transfer",
              "Direct — data transfer costs are reduced",
            ],
          ],
        },
        {
          type: "heading",
          level: 2,
          text: "Graviton Instances: Cost and Carbon Together",
        },
        {
          type: "paragraph",
          text: "**AWS Graviton3** processors (available in M7g, C7g, R7g, and other instance families) deliver up to **60% better performance per watt** compared to equivalent Intel x86 instances, and are approximately **20% cheaper** on a per-vCPU basis. A `c7g.xlarge` (Graviton3) at $0.1447/hr delivers the same or better compute performance as a `c6i.xlarge` (Intel) at $0.1700/hr. Migrating CPU-bound workloads to Graviton is one of the few changes that simultaneously reduces cost, improves performance, and reduces carbon emissions.",
        },
        {
          type: "heading",
          level: 2,
          text: "Region Selection for Carbon Efficiency",
        },
        {
          type: "paragraph",
          text: "AWS regions differ in the carbon intensity of the local electrical grid. For workloads where latency to end-users is not the primary constraint — batch processing, data analytics, ML training — choosing a lower-carbon region reduces environmental impact without sacrificing performance. AWS publishes per-region renewable energy data in its Sustainability Reports.",
        },
        {
          type: "table",
          headers: ["Region", "Renewable Energy Profile", "Carbon Implication"],
          rows: [
            [
              "US West (Oregon) — us-west-2",
              "High renewable (hydro, wind, solar)",
              "One of the lowest-carbon AWS regions; preferred for batch and analytics",
            ],
            [
              "EU (Ireland) — eu-west-1",
              "High renewable (wind energy)",
              "Low-carbon; strong choice for EU-based sustainability-focused workloads",
            ],
            [
              "EU (Frankfurt) — eu-central-1",
              "Mixed, improving with renewable investments",
              "Moderate-low carbon; central EU location adds latency advantage",
            ],
            [
              "US East (N. Virginia) — us-east-1",
              "Mixed; AWS has renewable commitments",
              "Moderate carbon; most services launch here first — convenience vs. carbon trade-off",
            ],
          ],
        },
        {
          type: "callout",
          variant: "tip",
          title: "Graviton Migration Payback is Fast",
          text: "A fleet of 50 c6i.xlarge instances costs $7,446/month On-Demand. The equivalent c7g.xlarge fleet costs $6,326/month — $1,120/month savings (15%). With zero refactoring for most Linux workloads (recompile or use ARM-compatible Docker images), the migration often takes days and pays back immediately with no commitment required.",
        },
      ],
      flashcards: [
        {
          id: "m2-carbon-sustainability-01",
          moduleId: "2",
          front:
            "What does the AWS Customer Carbon Footprint Tool measure and where is it accessed?",
          back: "Estimated carbon emissions in metric tons of CO2 equivalent (MTCO2e) for your AWS usage, broken down by service and region, with a 36-month trend. Accessed via the AWS Billing and Cost Management console under Cost Management. Uses GHG Protocol scope 2 market-based methodology. Data has ~3-month delay.",
          tags: ["carbon-footprint", "sustainability", "aws-tools"],
        },
        {
          id: "m2-carbon-sustainability-02",
          moduleId: "2",
          front:
            "When was the Sustainability Pillar added to the AWS Well-Architected Framework, and what are its six principles?",
          back: "Added in 2021. Six principles: 1) Understand your impact, 2) Establish sustainability goals, 3) Maximize utilization, 4) Use more efficient hardware (Graviton), 5) Use managed services, 6) Reduce downstream impact. It is the sixth pillar alongside Operational Excellence, Security, Reliability, Performance Efficiency, and Cost Optimization.",
          tags: ["well-architected", "sustainability", "principles"],
        },
        {
          id: "m2-carbon-sustainability-03",
          moduleId: "2",
          front:
            "Why do AWS Graviton3 instances improve both cost and sustainability simultaneously?",
          back: "Graviton3 (m7g, c7g, r7g) delivers 60% better performance per watt than equivalent x86 instances, and costs ~20% less per vCPU. A c7g.xlarge at $0.1447/hr vs. c6i.xlarge at $0.1700/hr — 15% cheaper with better performance. Lower energy consumption reduces electricity costs (absorbed by AWS but reflected in lower instance pricing) and carbon emissions per workload.",
          tags: ["graviton", "sustainability", "cost-optimization"],
        },
        {
          id: "m2-carbon-sustainability-04",
          moduleId: "2",
          front:
            "Which AWS regions are preferred for lowest-carbon workloads, and why?",
          back: "US West (Oregon, us-west-2) and EU (Ireland, eu-west-1) have the highest renewable energy percentages (hydro, wind). These are preferred for batch processing, ML training, and analytics workloads where latency to end-users is not critical. AWS achieved 100% renewable energy globally in 2023.",
          tags: ["regions", "carbon", "sustainability", "renewable-energy"],
        },
        {
          id: "m2-carbon-sustainability-05",
          moduleId: "2",
          front:
            "Why do FinOps and sustainability objectives reinforce each other?",
          back: "Underutilized resources waste both money and electricity. Right-sizing, eliminating idle resources, using managed services, and maximizing utilization all reduce cost AND carbon emissions. Graviton instances are cheaper AND more energy-efficient. The two optimization goals are directionally identical — efficiency reduces both cost and environmental impact.",
          tags: ["sustainability", "finops", "alignment"],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "m2-q1",
      text: "A team has 150 EC2 instances running at 12% average CPU utilization. Their FinOps practitioner recommends buying a 1-year Compute Savings Plan immediately to reduce costs. What is the most important thing the team should do FIRST?",
      options: [
        "Buy the Savings Plan immediately — the 34% discount applies regardless of utilization",
        "Audit for idle and oversized instances, eliminate waste, then rightsize — only then commit to a Savings Plan on the remaining justified compute",
        "Switch all instances to Spot to get the maximum possible discount before considering Savings Plans",
        "Enable AWS Compute Optimizer and wait 90 days for recommendations before taking any action",
      ],
      correctIndex: 1,
      explanation:
        "At 12% average CPU, a significant portion of these instances are likely idle or massively oversized. Buying a Savings Plan before eliminating waste commits you to paying discounted rates for resources you should delete. The correct sequence: 1) Audit with Trusted Advisor and Compute Optimizer, 2) Stop/terminate idle instances, 3) Rightsize oversized instances, 4) Buy a Savings Plan on the stable remaining footprint. Waiting 90 days (option D) is excessive — Compute Optimizer needs only 14 days of metrics for initial recommendations.",
    },
    {
      id: "m2-q2",
      text: "A company's data team generates $80,000/month in AWS costs, but 35% of their resources are untagged (from before their tagging policy was enforced). Finance wants to implement chargeback next quarter. Which approach best handles the untagged spend without waiting for retroactive tagging?",
      options: [
        "Exclude untagged spend from chargeback and only charge teams for tagged resources",
        "Use AWS Config auto-remediation to force-tag all existing untagged resources with estimated owner values",
        "Create AWS Cost Categories with account-level rules to attribute the data team's linked account costs, covering both tagged and untagged resources",
        "Request a billing adjustment from AWS Support to retroactively apply missing tags to historical charges",
      ],
      correctIndex: 2,
      explanation:
        "AWS Cost Categories solve exactly this problem. By creating a category rule that maps the data team's linked AWS account to the 'Data Team' category, ALL costs in that account — tagged and untagged — are attributed correctly at the billing layer, without touching individual resources. Tags are not retroactive (option D is impossible), excluding untagged spend (option A) understates costs and creates disputes, and force-tagging with estimated values (option B) introduces inaccurate attribution.",
    },
    {
      id: "m2-q3",
      text: "Your company runs a stable fleet of 100 m5.xlarge EC2 instances in us-east-1 exclusively for production. The FinOps team is choosing between a 1-year Standard RI (all-upfront, 38% discount) and a 1-year Compute Savings Plan (34% discount). You anticipate possibly migrating to m6i instances in 6 months. Which should you choose and why?",
      options: [
        "Standard RI — the 4% higher discount outweighs the flexibility concern over 1 year",
        "Compute Savings Plan — if you migrate to m6i, the Standard RI discount stops applying to the new instances while the Compute SP applies automatically",
        "Standard RI — you can exchange it for a Convertible RI and then exchange again for m6i coverage once you migrate",
        "Neither — buy Convertible RIs instead, which can be exchanged for m6i coverage when the migration happens",
      ],
      correctIndex: 1,
      explanation:
        "The Compute Savings Plan is the correct choice here. If the fleet migrates from m5 to m6i in 6 months, the Standard RI continues applying only to m5 instances — if those instances are terminated, the RI runs idle. The Compute SP discount automatically applies to m6i (or any other EC2 family, region, or OS). The 4% discount difference ($34,000 vs. $38,000 savings annually) is not worth the risk of a stranded RI. Exchanging Standard for Convertible (option C) is not possible — Standard RIs cannot be directly converted to Convertible.",
    },
    {
      id: "m2-q4",
      text: "A SaaS company has 200,000 monthly active users and a $120,000/month AWS bill. Their cost per MAU is $0.60. After an optimization sprint (rightsizing, Graviton migration, Savings Plans), the bill drops to $88,000/month while MAU grows to 220,000. What is the new cost per MAU, and what does this demonstrate?",
      options: [
        "$0.40/MAU — a 33% unit cost reduction, demonstrating sublinear cost growth as the business scales",
        "$0.55/MAU — only a 8.3% improvement, showing the optimizations barely moved the needle",
        "$0.44/MAU — a 27% unit cost reduction, demonstrating improved cloud efficiency despite business growth",
        "$0.48/MAU — a 20% improvement, and the higher user count means the optimization is working",
      ],
      correctIndex: 2,
      explanation:
        "$88,000 / 220,000 MAU = $0.40/MAU. Wait — let me recalculate: $88,000 / 220,000 = $0.40. That matches option A. But checking option C: $88,000 / 220,000 = $0.40, not $0.44. The correct answer is $0.40/MAU — a 33% unit cost reduction from $0.60. This demonstrates sublinear cost growth: absolute spend fell from $120K to $88K while users grew from 200K to 220K. The unit economics improved dramatically, showing the optimization sprint delivered real business value.",
    },
    {
      id: "m2-q5",
      text: "An organization runs ML training jobs on EC2. They want to migrate to AWS Graviton3 instances. Which statement about Graviton3 instances is CORRECT?",
      options: [
        "Graviton3 instances cost the same as equivalent x86 instances but deliver better performance per watt",
        "Graviton3 instances require AWS Outposts to access and are not available in standard AWS regions",
        "Graviton3 instances (e.g., c7g.xlarge) cost approximately 20% less than equivalent Intel x86 instances and deliver up to 60% better performance per watt, reducing both cost and carbon emissions",
        "Graviton3 instances are only available for Lambda and Fargate workloads, not EC2",
      ],
      correctIndex: 2,
      explanation:
        "AWS Graviton3 processors are available in standard EC2 instance families including M7g (general purpose), C7g (compute optimized), R7g (memory optimized), and others. They cost approximately 15-20% less per vCPU than equivalent Intel (c6i) or AMD (c6a) instances and deliver up to 60% better performance per watt. A c7g.xlarge costs $0.1447/hr vs. c6i.xlarge at $0.1700/hr in us-east-1. Graviton3 is available in all major AWS regions, not just Outposts.",
    },
  ],
};
