import {
  BarChart2,
  BookOpen,
  CheckCircle2,
  Lock,
  Network,
  Server,
  Sparkles,
  TrendingDown,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";

const iconMap: Record<string, React.ElementType> = {
  BarChart2,
  TrendingDown,
  Server,
  Network,
  Sparkles,
  BookOpen,
};

interface Props {
  moduleId: string;
  title: string;
  subtitle: string;
  icon: string;
  unlocked: boolean;
  progress: number;
  quizCompleted: boolean;
}

export function ModuleCard({
  moduleId,
  title,
  subtitle,
  icon,
  unlocked,
  progress,
  quizCompleted,
}: Props) {
  const Icon = iconMap[icon] ?? BookOpen;

  const badge = quizCompleted ? (
    <Badge className="bg-green-100 text-green-800 border-green-200">
      Complete
    </Badge>
  ) : !unlocked ? (
    <Badge variant="outline" className="text-muted-foreground">
      Locked
    </Badge>
  ) : progress > 0 ? (
    <Badge
      variant="outline"
      className="text-blue-700 border-blue-200 bg-blue-50"
    >
      In Progress
    </Badge>
  ) : (
    <Badge variant="outline">Not Started</Badge>
  );

  const inner = (
    <Card
      className={`transition-all ${unlocked ? "hover:shadow-md cursor-pointer" : "opacity-60"}`}
    >
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3">
            <div
              className={`p-2 rounded-lg ${quizCompleted ? "bg-green-100" : unlocked ? "bg-primary/10" : "bg-muted"}`}
            >
              {quizCompleted ? (
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              ) : !unlocked ? (
                <Lock className="h-5 w-5 text-muted-foreground" />
              ) : (
                <Icon className="h-5 w-5 text-primary" />
              )}
            </div>
            <div>
              <CardTitle className="text-base leading-tight">{title}</CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>
            </div>
          </div>
          {badge}
        </div>
      </CardHeader>
      <CardContent>
        <Progress value={progress} className="h-1.5" />
        <p className="text-xs text-muted-foreground mt-1">
          {progress}% complete
        </p>
      </CardContent>
    </Card>
  );

  if (!unlocked) return <div>{inner}</div>;
  return <Link to={`/module/${moduleId}`}>{inner}</Link>;
}
