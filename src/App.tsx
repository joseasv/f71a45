import JourneyBuilder from "./components/JourneyBuilder";
// GET URL http://localhost:3000/api/v1/1/actions/blueprints/1/graph

export default function App() {
  return (
    <>
      <JourneyBuilder
        tenant_id="1"
        blueprint_version_id="1"
        action_blueprint_id="1"
      />
    </>
  );
}
