import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { FaArrowRotateRight } from "react-icons/fa6";

export const SubmitButton = ({ isDesktop }: { isDesktop?: boolean }) => {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      className={`font-bold cursor-pointer ${!isDesktop && "w-full"}`}
    >
      {pending ? (
        <>
          <FaArrowRotateRight className="animate-spin" /> Submitting...
        </>
      ) : (
        "Submit"
      )}
    </Button>
  );
};
