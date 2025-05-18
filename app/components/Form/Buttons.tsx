import useMediaQuery from "@/hooks/useMediaQuery";
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

export const DeleteButton = ({ isLoading }: { isLoading: boolean }) => {
  const isDesktop = useMediaQuery("(min-width: 768px)", {
    initializeWithValue: false,
    defaultValue: true,
  });

  return (
    <Button
      variant="destructive"
      type="submit"
      className={`font-bold cursor-pointer ${!isDesktop && "w-full"}`}
    >
      {isLoading ? (
        <>
          <FaArrowRotateRight className="animate-spin" /> Deleting...
        </>
      ) : (
        "Delete"
      )}
    </Button>
  );
};
