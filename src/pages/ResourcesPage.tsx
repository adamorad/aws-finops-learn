import { ExternalLink } from "lucide-react";
import { Badge } from "../components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

type Resource = {
  title: string;
  description: string;
  url: string;
  tag: string;
  tagColor?: string;
};

type Section = {
  heading: string;
  resources: Resource[];
};

const sections: Section[] = [
  {
    heading: "Official AWS Training",
    resources: [
      {
        title: "FinOps Fundamentals & Strategies — Part 1",
        description:
          "Migration business cases, forecasting, budgeting, cost reporting, and governance.",
        url: "https://explore.skillbuilder.aws/learn/courses/external/view/elearning/20543/aws-cloud-financial-management-for-builders",
        tag: "Free · AWS Skill Builder",
      },
      {
        title: "FinOps Fundamentals & Strategies — Part 2",
        description:
          "Cost optimization, cost allocation, AWS pricing models, and carbon emissions tracking.",
        url: "https://explore.skillbuilder.aws/learn/courses",
        tag: "Free · AWS Skill Builder",
      },
      {
        title: "Cost Optimization Solutions for FinOps — Part 1",
        description:
          "Optimize EC2, Lambda, S3, EFS, EBS, RDS, Aurora, DynamoDB, and ElastiCache.",
        url: "https://explore.skillbuilder.aws/learn/courses",
        tag: "Free · AWS Skill Builder",
      },
      {
        title: "Cost Optimization Solutions for FinOps — Part 2",
        description:
          "Data transfer, networking, analytics, and container cost optimization.",
        url: "https://explore.skillbuilder.aws/learn/courses",
        tag: "Free · AWS Skill Builder",
      },
      {
        title: "FinOps for GenAI",
        description:
          "Cost management for Bedrock, SageMaker, EC2 AI workloads, and Amazon Q.",
        url: "https://explore.skillbuilder.aws/learn/courses",
        tag: "Free · AWS Skill Builder",
        tagColor: "blue",
      },
    ],
  },
  {
    heading: "FinOps Foundation",
    resources: [
      {
        title: "FinOps Framework",
        description:
          "The open-source framework defining FinOps principles, personas, capabilities, and maturity model.",
        url: "https://www.finops.org/framework/",
        tag: "Framework",
      },
      {
        title: "FinOps Certified Practitioner (FOCP)",
        description:
          "The industry-standard certification for FinOps practitioners. Self-paced study guide available.",
        url: "https://learn.finops.org/path/finops-certified-practitioner-self-paced",
        tag: "Certification",
        tagColor: "green",
      },
      {
        title: "FOCUS — FinOps Open Cost & Usage Specification",
        description:
          "Open billing data standard for normalizing cost data across AWS, Azure, GCP, and OCI.",
        url: "https://focus.finops.org/",
        tag: "Specification",
      },
      {
        title: "FinOps Community Slack",
        description:
          "10,000+ practitioners sharing real-world FinOps experience, tooling tips, and case studies.",
        url: "https://www.finops.org/community/",
        tag: "Community",
      },
    ],
  },
  {
    heading: "AWS Cost Tools — Documentation",
    resources: [
      {
        title: "AWS Cost Explorer",
        description:
          "Visualize, understand, and manage AWS costs and usage over time with built-in forecasting.",
        url: "https://docs.aws.amazon.com/cost-management/latest/userguide/ce-what-is.html",
        tag: "Docs",
      },
      {
        title: "AWS Budgets",
        description:
          "Set custom cost and usage budgets with alerts and automated actions via SNS or Lambda.",
        url: "https://docs.aws.amazon.com/cost-management/latest/userguide/budgets-managing-costs.html",
        tag: "Docs",
      },
      {
        title: "AWS Compute Optimizer",
        description:
          "ML-powered rightsizing recommendations for EC2, Lambda, EBS, ECS, and Auto Scaling Groups.",
        url: "https://docs.aws.amazon.com/compute-optimizer/latest/ug/what-is-compute-optimizer.html",
        tag: "Docs",
      },
      {
        title: "AWS Trusted Advisor",
        description:
          "Automated checks for cost optimization, security, fault tolerance, and performance.",
        url: "https://docs.aws.amazon.com/awssupport/latest/user/trusted-advisor.html",
        tag: "Docs",
      },
      {
        title: "AWS Pricing Calculator",
        description:
          "Estimate the cost of your AWS architecture before you build it.",
        url: "https://calculator.aws/pricing/2/home",
        tag: "Tool",
      },
      {
        title: "AWS Customer Carbon Footprint Tool",
        description:
          "Track, measure, and forecast carbon emissions from your AWS usage.",
        url: "https://aws.amazon.com/aws-cost-management/aws-customer-carbon-footprint-tool/",
        tag: "Tool",
      },
    ],
  },
  {
    heading: "Savings & Commitment Discounts",
    resources: [
      {
        title: "Savings Plans Guide",
        description:
          "Compare Compute, EC2 Instance, and SageMaker Savings Plans. Understand break-even and flexibility.",
        url: "https://docs.aws.amazon.com/savingsplans/latest/userguide/what-is-savings-plans.html",
        tag: "Docs",
      },
      {
        title: "Reserved Instances Guide",
        description:
          "Standard vs Convertible RIs, Zonal vs Regional scope, and Marketplace for unused capacity.",
        url: "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-reserved-instances.html",
        tag: "Docs",
      },
      {
        title: "EC2 Spot Best Practices",
        description:
          "Architect fault-tolerant workloads on Spot with Spot Fleet, interruption handling, and Karpenter.",
        url: "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/spot-best-practices.html",
        tag: "Docs",
      },
    ],
  },
  {
    heading: "Open-Source Tools",
    resources: [
      {
        title: "cloud-finops-skills (OptimNow)",
        description:
          "28 FOCUS-aligned FinOps reference files covering AWS/Azure/GCP. Refreshed bi-monthly.",
        url: "https://github.com/OptimNow/cloud-finops-skills",
        tag: "GitHub",
        tagColor: "purple",
      },
      {
        title: "Karpenter",
        description:
          "Open-source Kubernetes node provisioner. Reduces waste through bin-packing and fast scale-down.",
        url: "https://karpenter.sh/",
        tag: "OSS",
      },
      {
        title: "AWS Cost & Usage Report (CUR) — Field Reference",
        description:
          "Complete field dictionary for the raw billing data file used by every FinOps tool.",
        url: "https://docs.aws.amazon.com/cur/latest/userguide/data-dictionary.html",
        tag: "Reference",
      },
      {
        title: "infracost",
        description:
          "Shift-left cost estimation — shows AWS cost impact of Terraform changes in CI/CD.",
        url: "https://www.infracost.io/",
        tag: "OSS",
        tagColor: "green",
      },
    ],
  },
  {
    heading: "Blogs & Deeper Reading",
    resources: [
      {
        title: "AWS Cloud Financial Management Blog",
        description:
          "Official AWS blog covering new CFM features, customer stories, and FinOps best practices.",
        url: "https://aws.amazon.com/blogs/aws-cloud-financial-management/",
        tag: "Blog",
      },
      {
        title: "AWS Well-Architected — Cost Optimization Pillar",
        description:
          "The canonical AWS reference for building cost-aware architectures. Includes design principles and question sets.",
        url: "https://docs.aws.amazon.com/wellarchitected/latest/cost-optimization-pillar/welcome.html",
        tag: "Whitepaper",
      },
      {
        title: "The FinOps Book (O'Reilly)",
        description:
          "Cloud FinOps by J.R. Storment & Mike Fuller — the definitive practitioner guide.",
        url: "https://www.oreilly.com/library/view/cloud-finops/9781492054610/",
        tag: "Book",
        tagColor: "orange",
      },
    ],
  },
];

const tagColors: Record<string, string> = {
  blue: "bg-blue-100 text-blue-800 border-blue-200",
  green: "bg-green-100 text-green-800 border-green-200",
  purple: "bg-purple-100 text-purple-800 border-purple-200",
  orange: "bg-orange-100 text-orange-800 border-orange-200",
};

export function ResourcesPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold">External Resources</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Curated links for going deeper — official docs, certifications, tools,
          and community.
        </p>
      </div>

      {sections.map((section) => (
        <div key={section.heading} className="space-y-3">
          <h2 className="text-base font-semibold text-foreground border-b pb-2">
            {section.heading}
          </h2>
          <div className="space-y-2">
            {section.resources.map((r) => (
              <a
                key={r.url}
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Card className="hover:shadow-md transition-shadow cursor-pointer group">
                  <CardHeader className="pb-1 pt-4 px-4">
                    <div className="flex items-start justify-between gap-3">
                      <CardTitle className="text-sm font-medium group-hover:text-primary transition-colors leading-snug">
                        {r.title}
                      </CardTitle>
                      <div className="flex items-center gap-2 shrink-0">
                        <Badge
                          variant="outline"
                          className={`text-xs ${r.tagColor ? tagColors[r.tagColor] : ""}`}
                        >
                          {r.tag}
                        </Badge>
                        <ExternalLink className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-4 px-4">
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {r.description}
                    </p>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
