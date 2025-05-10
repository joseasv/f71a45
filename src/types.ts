export interface ActionBlueprintGraphGetParams {
  action_blueprint_id: string;
  blueprint_version_id: string;
  tenant_id: string;
}

export interface ActionBlueprintGraphResponse {
  $schema: string;
  blueprint_id: string;
  blueprint_name: string;
  branches: Branch[] | null;
  edges: Edge[] | null;
  forms: Form[] | null;
  nodes: Node[] | null;
  status: string;
  tenant_id: string;
  triggers: Trigger[] | null;
  version_id: string;
  version_notes: string;
  version_number: string;
}

export interface Branch {
  $schema: string;
  condition: Record<string, any>;
  created_at: Date;
  description: string;
  id: string;
  name: string;
  tenant_id: string;
  updated_at: Date;
}

export interface Edge {
  source: string;
  target: string;
}

export interface Form {
  $schema: string;
  created_at: Date;
  created_by: string;
  custom_javascript: string;
  custom_javascript_triggering_fields: string[] | null;
  description: string;
}

export interface DynamicFieldConfig {
  endpoint_id: string;
  output_key: string;
  payload_fields: Record<string, PayloadField>;
}

type CommonFields = {
  component_key: string;
  is_metadata: boolean;
  output_key: string;
  type: string;
};

type NumberUnit = {
  number: number;
  unit: string;
};

export interface PayloadField extends CommonFields {}

export interface FieldSchema {
  properties: Record<string, any>;
  required: string[] | null;
  type: string;
}

export interface UISchema {
  elements: [] | null;
  type: string;
}

export interface Node {
  data: Data;
  id: string;
  position: Position;
  type: ComponentType;
}

export interface Position {
  x: number;
  y: number;
}

export enum ComponentType {
  form,
  branch,
  trigger,
  configuration,
}

export interface Data {
  approval_auto_assign_config: ApprovalAutoAssignConfig;
  approval_required: boolean;
  approval_roles: string[] | null;
  approval_scheduled_delays: ApprovalScheduledDelays;
  approval_sla_duration: ApprovalSLADuration;
  approval_task_name: string;
  auto_assign_config: AutoAssignConfig;
  component_id: string;
  component_key: string;
  component_type: ComponentType;
  data_promotion_config: Record<string, string>;
  id: string;
  input_mapping: Record<string, InputMapping>;
  name: string;
  permitted_roles: string[] | null;
  prerequisites: string[] | null;
  scheduled_delay: ScheduledDelay;
  sla_duration: SLADuration;
  state_transition_rules: StateTransitionRules;
}

export enum ExportTransitionRules {
  pending_approval,
  complete,
}

export interface StateTransitionRules {
  state_transition_rules_if: ActionComponentDataExpression;
  state_transition_rules_then: ExportTransitionRules;
}

export interface ActionComponentDataExpression extends CommonFields {}

export interface ActionDataExpression {
  output_key: string;
  type: string;
}

export interface AgentDirectlyAssignedExpression {
  agent_id?: string;
  roles?: string[];
  type: string;
}

export interface AggregateExpression {
  aggregate: string;
  column: string;
  type: string;
}

export interface AndExpression {
  operands: AllExpressions[]; // all expressions
  type: string;
}

export interface BinaryExpression {
  left: AllExpressions; // all expressions
  operator: string;
  right: AllExpressions; // all expressions
  type: string;
}

export interface ClientOrganizationExpression {
  field: string;
  jsonPath: string;
  type: string;
}

export interface ColumnExpression {
  column: string;
  type: string;
}

export interface ExistsExpression {
  operand: AllExpressions; // all expressions
  type: string;
}

export interface FormFieldExpression {
  type: string;
  value: any;
}

export interface LiteralExpression {
  type: string;
  value: any;
}

export interface NotExpression {
  operand: AllExpressions; // all expressions
  type: string;
}

export interface OrExpression {
  operands: AllExpressions[]; //all expressions
  type: string;
}

export interface PropertyExpression {
  jsonPath: string[] | null;
  object: string;
  property: string;
  type: string;
}

export interface TaskOwnerExpression {
  component_key: string;
  property: string;
  task_type: string;
  type: string;
}

type AllExpressions =
  | ActionComponentDataExpression
  | ActionDataExpression
  | AgentDirectlyAssignedExpression
  | AggregateExpression
  | AndExpression
  | BinaryExpression
  | ClientOrganizationExpression
  | ColumnExpression
  | ExistsExpression
  | FormFieldExpression
  | LiteralExpression
  | NotExpression
  | OrExpression
  | PropertyExpression
  | TaskOwnerExpression;

export interface SLADuration extends NumberUnit {}

export interface ScheduledDelay extends NumberUnit {}

export interface InputMapping extends CommonFields {}

export interface ApprovalScheduledDelays extends NumberUnit {}

export interface ApprovalSLADuration extends NumberUnit {}

export interface ApprovalAutoAssignConfig {
  form_field: string;
  form_key: string;
  type: string;
  value: string;
  approval_task_name: string;
  auto_assign_config: AutoAssignConfig;
}

export interface AutoAssignConfig {
  form_field: string;
  form_key: string;
  type: string;
  value: string;
}

export interface Trigger {
  $schema: string;
  created_at: Date;
  id: string;
  max_retries: bigint;
  name: string;
  output_mapping: Record<string, string>;
  path_template: string;
  path_template_variables: string[] | null;
  payload_template: Record<string, any>;
  payload_template_variables: string[] | null;
  quey_parameter_template: Record<string, string>;
}
