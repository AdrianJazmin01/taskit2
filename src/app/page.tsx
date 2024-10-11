import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";



export default function Home() {
  return (
    <div  className="gap-4">
        <Input></Input>
        <Select></Select>
        <Button variant={"primary"} size={"sx"}>Primary123</Button>
        <Button variant={"destructive"} >destructive</Button>
        <Button variant={"secondary"} >secondary</Button>
        <Button variant={"ghost"} >ghost</Button>
        <Button variant={"muted"} >muted</Button>
        <Button variant={"teritary"} >teritary</Button>
    </div>
    
  );
}
