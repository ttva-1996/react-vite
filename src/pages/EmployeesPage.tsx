import { useState } from "react";
import { Link } from "react-router-dom";
import { useEmployees, useCreateEmployee } from "../features/employees/hooks";

export default function EmployeesPage() {
  const { data, isLoading, isError } = useEmployees();
  const createMutation = useCreateEmployee();

  // local UI state (controlled form)
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Failed to load employees</div>;

  return (
    <div>
      <h3>Employees</h3>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          createMutation.mutate({
            name: name.trim(),
            position: position.trim(),
          });
          setName("");
          setPosition("");
        }}
        style={{ display: "flex", gap: 8, marginBottom: 12 }}
      >
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Position"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        />
        <button type="submit" disabled={createMutation.isPending}>
          {createMutation.isPending ? "Creating..." : "Create"}
        </button>
      </form>

      {createMutation.isError && (
        <div style={{ color: "red" }}>Create failed</div>
      )}

      <ul>
        {data?.map((emp) => (
          <li key={emp.id}>
            <Link to={`/employees/${emp.id}`}>
              {emp.name} – {emp.position}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
