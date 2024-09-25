import { useEffect, useRef } from "react";

interface Props {
    children: React.ReactNode;
    exceptionRef?: React.RefObject<HTMLElement>;
    onClick: () => void;
    className?: string;
  }
  
  const ClickOutside: React.FC<Props> = ({
    children,
    exceptionRef,
    onClick,
    className,
  }) => {
    // Create a ref to track the wrapper div
    const wrapperRef = useRef<HTMLDivElement>(null);
  
    useEffect(() => {
      // Function to handle click events
      const handleClickListener = (event: MouseEvent) => {
        let clickedInside = false;
  
        // Check if the click is within the wrapper or the exception element (if provided)
        if (
          wrapperRef.current &&
          wrapperRef.current.contains(event.target as Node)
        ) {
          clickedInside = true;
        } else if (
          exceptionRef?.current &&
          (exceptionRef.current === event.target ||
            exceptionRef.current.contains(event.target as Node))
        ) {
          clickedInside = true;
        }
  
        // If the click is outside, trigger the onClick callback
        if (!clickedInside) {
          onClick();
        }
      };
  
      // Attach the event listener to detect outside clicks
      document.addEventListener("mousedown", handleClickListener);
  
      // Clean up the event listener on component unmount
      return () => {
        document.removeEventListener("mousedown", handleClickListener);
      };
    }, [exceptionRef, onClick]);
  
    return (
      // Apply the wrapper ref and optional class name to the div
      <div ref={wrapperRef} className={className || ""}>
        {children}
      </div>
    );
  };
  
  export default ClickOutside;