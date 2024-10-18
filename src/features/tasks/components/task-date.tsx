import { cn } from "@/lib/utils";
import { differenceInDays, format } from "date-fns";


interface TaskDateProps{
  value: string;
  className?:string
};

export const TaskDate = ({ value, className }: TaskDateProps) => {
  const today = new Date();
  const endDate = new Date(value);
  const diffInDays = differenceInDays(endDate, today);

  let textcolor = "text-muted-foreground"
    if (diffInDays <= 3) {
      textcolor = "text-red-600"
    } else if (diffInDays <= 7) {
      textcolor = "text-orange-400"
    } else if (diffInDays <= 14) {
      textcolor = "text-yellow-300"
    }
 
  return (
    <div className={textcolor}>
      <span className={cn("truncate", className)}>
        {format(value, "PPP")}
      </span>
    </div>
  )
}
