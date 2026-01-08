import { useParams } from "react-router-dom";
import { useEmployee } from "../features/employees/hooks";

export default function EmployeeDetailPage() {
  const { id } = useParams();
  const { data, isLoading, isError } = useEmployee(id ?? null);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Failed to load employee</div>;
  if (!data) return <div>Not found</div>;

  return (
    <div>
      <h3>Employee Detail</h3>
      <p>
        <b>ID:</b> {data.id}
      </p>
      <p>
        <b>Name:</b> {data.name}
      </p>
      <p>
        <b>Position:</b> {data.position}
      </p>
    </div>
  );
}
