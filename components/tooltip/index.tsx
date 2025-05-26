import React, { useState, useRef, useEffect } from "react";
import DOMPurify from "isomorphic-dompurify";
import {
    TooltipTarget,
    TooltipBox,
    TooltipContent,
    CloseButton,
    TooltipArrow
} from "./styles";
import CloseIcon from "@public/images/close-icon.svg";
import { setInSessionStorage } from "@actions/setInSessionStorage";
import { getFromSessionStorage } from "@actions/getFromSessionStorage";

interface TooltipProps {
    children: React.ReactNode;
    content: string;
    shouldShowOnce?: boolean;
    sessionKey?: string;
}

const Tooltip: React.FC<TooltipProps> = ({
    children,
    content,
    shouldShowOnce = false,
    sessionKey = ""
}) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (!shouldShowOnce) {
            setVisible(true);
            return;
        }
        const isTooltipShown = Boolean(getFromSessionStorage({ key: sessionKey }));
        if (!isTooltipShown) {
            setVisible(true);
            setInSessionStorage({ key: sessionKey, value: true });
        }
    }, []);

    useEffect(() => {
        if (visible) {
            const timer = setTimeout(() => {
                setVisible(false);
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [visible]);

    return (
        <TooltipTarget>
            {children}
            {visible && content && (
                <TooltipBox>
                    <CloseButton onClick={() => setVisible(false)}>
                        <CloseIcon />
                    </CloseButton>
                    <TooltipContent
                        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}
                    />
                    <TooltipArrow />
                </TooltipBox>
            )}
        </TooltipTarget>
    );
};

export default Tooltip;
