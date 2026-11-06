import { ref } from "vue";

import { useToast } from "./use-toast";

type ResourceId = string | number;

export type MoveDirection = "up" | "down" | "up-top";

/**
 * Реализация переноса.
 *
 * Параметризован набором направлений: параметры функций контравариантны,
 * поэтому без этого реализация вида (id, direction: "up" | "down") не
 * присваивалась типу, обещающему принимать и "up-top". Проектам, у которых
 * бэкенд не умеет "up-top", больше не нужно расширять сигнатуру ради типов —
 * параметр выводится из самой реализации.
 */
export type MoveResource<D extends MoveDirection = MoveDirection> = (
  entityId: ResourceId,
  direction: D
) => Promise<{ success: boolean }>;

export function useResourceMove<
  D extends MoveDirection = MoveDirection,
>(params: {
  moveResource: MoveResource<D>;
  resourceName?: string;
  onSuccess?: () => void;
}): {
  handleResourceMove: (entityId: ResourceId, direction: D) => void;
  isMoving: (entityId: ResourceId) => boolean;
} {
  const movingResourceIdList = ref<Array<ResourceId>>([]);
  const toast = useToast();

  function handleResourceMove(entityId: ResourceId, direction: D) {
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
