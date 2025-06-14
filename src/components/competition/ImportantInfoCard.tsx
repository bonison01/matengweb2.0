
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const ImportantInfoCard = () => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Important Information</CardTitle>
        <CardDescription>Please read before filling the form</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold">Eligibility:</h3>
          <p>Class 4, Class 5 and Class 6</p>
        </div>
        <div>
          <h3 className="font-semibold">Key Dates:</h3>
          <ul className="list-disc list-inside space-y-1">
            {/* <li>Last date for registration: May 30, 2025</li> */}
            {/* <li>Admit card issue: June 3, 2025</li> */}
            <li>Competition date: June 22, 2025</li>
            <li>Result Out: June 25, 2025</li>
            <li>Award ceremony: To be announce soon</li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold">Required Documents:</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>Scanned copy of Aadhaar Card (front and back)</li>
            <li>Recent passport-size photograph</li>
            <li>Payment screenshot (₹200 registration fee)</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default ImportantInfoCard;
