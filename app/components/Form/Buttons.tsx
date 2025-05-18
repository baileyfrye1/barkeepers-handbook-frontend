import { Button } from "../ui/button";
import { FaArrowRotateRight } from "react-icons/fa6";

export const SubmitButton = ({
  isDesktop,
  isLoading,
}: {
  isDesktop?: boolean;
  isLoading: boolean;
}) => {
  return (
    <Button
      type="submit"
      className={`font-bold cursor-pointer ${!isDesktop && "w-full"}`}
    >
      {isLoading ? (
        <>
          <FaArrowRotateRight className="animate-spin" /> Submitting...
        </>
      ) : (
        "Submit"
      )}
    </Button>
  );
};
