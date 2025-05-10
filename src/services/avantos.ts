import axios from "axios";

import { apiBaseUrl } from "../constants";

// GET URL http://localhost:3000/api/v1/1/actions/blueprints/1/graph

// GET URL http://localhost:3000/api/v1/1/actions/blueprints/1/graph
import type {
  ActionBlueprintGraphGetParams,
  ActionBlueprintGraphResponse,
} from "../types";

export const getActionBlueprint = async (
  requestParams: ActionBlueprintGraphGetParams,
) => {
  return axios
    .get<ActionBlueprintGraphResponse>(
      `${apiBaseUrl}/${requestParams.tenant_id}/actions/blueprints/${requestParams.action_blueprint_id}/graph`,
    )
    .then((response) => response.data);
};
