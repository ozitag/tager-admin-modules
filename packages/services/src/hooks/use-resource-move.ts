import { ref } from "vue";

import { useToast } from "./use-toast";

type ResourceId = string | number;

export type MoveDirection = "up" | "down" | "up-top";
type MoveDirectionOld = "up" | "down";

export type MoveResource = (
  entityId: ResourceId,
  direction: MoveDirection | MoveDirectionOld
) => Promise<{ success: boolean }>;

export function useResourceMove(params: {
  moveResource: MoveResource;
  resourceName?: string;
  onSuccess?: () => void;
}): {
  handleResourceMove: (entityId: ResourceId, direction: MoveDirection) => void;
  isMoving: (entityId: ResourceId) => boolean;
} {
  const movingResourceIdList = ref<Array<ResourceId>>([]);
  const toast = useToast();

  function handleResourceMove(entityId: ResourceId, direction: MoveDirection) {
    const resourceName = params.resourceName ?? "Resource";

    movingResourceIdList.value.push(entityId);

    params
      .moveResource(entityId, direction)
      .then((response) => {
        if (response.success) {
          if (params.onSuccess) {
            params.onSuccess();
          }

          toast.show({
            variant: "success",
            title: "Success",
            body: `${resourceName} has been successfully moved`,
          });
        } else {
          toast.show({
            variant: "danger",
            title: "Error",
            body: `${resourceName} move has been failed`,
          });
        }
      })
      .catch((error) => {
        console.error(error);
        toast.show({
          variant: "danger",
          title: "Error",
          body: `${resourceName} move has been failed`,
        });
      })
      .finally(() => {
        movingResourceIdList.value = movingResourceIdList.value.filter(
          (id) => id !== entityId
        );
      });
  }

  return {
    handleResourceMove,
    isMoving: (entityId: ResourceId) =>
      movingResourceIdList.value.includes(entityId),
  };
}
