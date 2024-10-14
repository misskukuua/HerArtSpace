import { useCallback } from "react";

const useApiValidationErrors = (fieldMap, setError) => {
  const setApiValidationErrors = useCallback(
    (apiErrors) => {
      if (!apiErrors) {
        return;
      }

      for (const key in apiErrors) {
        if (Object.hasOwn(fieldMap, key) && apiErrors[key]?.length > 0) {
          setError(fieldMap[key], {
            type: "custom",
            message: apiErrors[key].join("\n"),
          });
        }
      }
    },
    [fieldMap, setError]
  );

  return { setApiValidationErrors };
};

export default useApiValidationErrors;
