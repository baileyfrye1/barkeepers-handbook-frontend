import { useActionState, useState, useEffect } from "react";
import { toast } from "sonner";

const FormContainer = ({
  action,
  children,
}: {
  action: (state: any) => Promise<any>;
  children: React.ReactNode;
}) => {
  const [state, formAction] = useActionState(action, {
    message: "",
    success: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setIsSubmitting(state.loading ?? false);

    if (!state.loading && state.message) {
      if (state.success) {
        toast.success(state.message);
      } else {
        toast.error(state.message);
      }
    }
  }, [state]);

  return <form action={formAction}>{children}</form>;
};

export default FormContainer;
