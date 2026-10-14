
import {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
} from "react";

export default forwardRef(function TextInput(
    {
        type = "text",
        className = "",
        isFocused = false,
        ...props
    },
    ref,
) {
    const localRef = useRef(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    return (
        <input
            {...props}
            type={type}
            ref={localRef}
            className={
                "block rounded-xl border border-violet-200 bg-white text-slate-900 placeholder:text-slate-400 shadow-sm transition-colors duration-200 focus:border-violet-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-violet-200 " +
                className
            }
        />
    );
});
