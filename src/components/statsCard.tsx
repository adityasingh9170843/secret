import {
  Card,
  CardContent,
  
  CardTitle,
} from "@/components/ui/card";



interface StatsCardsProps{
    total:number,
    positive:number,
    negative:number
}


export function StatsCards({total,positive,negative}:StatsCardsProps) {
     return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <Card className="transition-all duration-200 hover:shadow-lg hover:ring-2 hover:ring-blue-500 cursor-pointer">
        <CardContent className="p-4">
          <CardTitle>Total Feedback</CardTitle>
          <p className="text-2xl font-bold">{total}</p>
        </CardContent>
      </Card>
      <Card className="transition-all duration-200 hover:shadow-lg hover:ring-2 hover:ring-blue-500 cursor-pointer">
        <CardContent className="p-4">
          <CardTitle>Positive</CardTitle>
          <p className="text-2xl font-bold text-green-600">{positive}</p>
        </CardContent>
      </Card>
      <Card className="transition-all duration-200 hover:shadow-lg hover:ring-2 hover:ring-blue-500 cursor-pointer">
        <CardContent className="p-4">
          <CardTitle>Negative</CardTitle>
          <p className="text-2xl font-bold text-red-500">{negative}</p>
        </CardContent>
      </Card>
    </div>
  );
}

