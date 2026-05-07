"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./paymentaccordion.module.scss";
import { div, s } from "framer-motion/client";

interface PaymentAccordionProps {
    title: string;
    description: string;
    status: string; // e.g., 'paid', 'pending', etc.
    tag?: string;
    paymentId?: string;
    children?: React.ReactNode; // Allows passing custom HTML/Components inside
}

/**
 * Single expandable payment accordion component taking individual props
 */
export const PaymentAccordion = ({
    title,
    description,
    status,
    tag,
    paymentId,
    children
}: PaymentAccordionProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen((prev) => !prev);
    };

    const pathUp =
        "M4.16665 12.5L8.74569 7.26681C9.40971 6.50793 10.5903 6.50793 11.2543 7.26681L15.8333 12.5";
    const pathDown =
        "M4.16669 7.5L8.74573 12.7332C9.40974 13.4921 10.5903 13.4921 11.2543 12.7332L15.8334 7.5";

    return (
        <div className={styles.cardcontainer}>
            <motion.div
                // whileTap={{ backgroundColor: "hsl(0, 0%, 94%)" }}
                className={`${styles.cardheader} ${styles[`color${status}`]}`}
                onClick={handleToggle}
            >
                <div className={styles.cardleft}>
                    <div className={styles.cardinfo}>

                        {/* Visual Status Indicator */}
                        <div className={`${styles.paystatus}`}>
                            <div className={styles[`${status}`]}></div>
                            {description}
                        </div>

                        <h3 className={styles.cardtitle}>{title}</h3>

                        <div className={styles.cardchips}>
                            {tag && <span className={styles.chip}>{tag}</span>}
                        </div>
                    </div>
                </div>

                <button className={styles.expandbtn}>
                    <svg width={16} height={16} viewBox="0 0 20 20" fill="none">
                        <motion.path
                            initial={false}
                            animate={{ d: isOpen ? pathUp : pathDown }}
                            transition={{ type: "spring", stiffness: 260, damping: 20 }}
                            stroke="currentColor"
                            strokeWidth="1.25"
                            strokeLinecap="round"
                        />
                    </svg>
                </button>
            </motion.div>

            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        // className={styles.cardbodywrapper}
                        className={`${styles.cardbodywrapper} ${styles[`color${status}`]}`}

                        initial="collapsed"
                        animate="open"
                        exit="collapsed"
                        variants={{
                            open: {
                                opacity: 1,
                                height: "auto",
                                transition: { type: "spring", stiffness: 260, damping: 20 },
                            },
                            collapsed: {
                                opacity: 0,
                                height: 0,
                                transition: { duration: 0.14 },
                            },
                        }}
                    >
                        <div className={styles.expandedcontent}>
                            {/* Render custom children if provided, otherwise render default layout */}
                            {children ? (
                                children
                            ) : (
                                <>
                                    {paymentId && (
                                        <div className={styles.expandedrow}>
                                            <span className={styles.expandedlabel}>
                                                Payment ID:
                                                <span className={styles.payid}>
                                                    {paymentId}
                                                </span>
                                            </span>
                                        </div>
                                    )}

                                    {/* Conditionally render the receipt button based on status */}
                                    {status === 'paid' && (
                                        <button
                                            className={styles.reciptbtn}>
                                            Print receipt
                                        </button>
                                    )}

                                    {status === 'failed' && (
                                        <div className={styles.buttonwraper}>
                                            <button
                                                className={styles.secondarybtn}>
                                                Pay logs
                                            </button>

                                            <button
                                                className={styles.primarybtn}>
                                                Mark Paid via cash
                                            </button>
                                        </div>
                                    )}

                                    {status === 'processing' && (
                                        <div className={styles.buttonwraper}>
                                            <button
                                                className={styles.primarybtn}>
                                                Pay logs
                                            </button>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default PaymentAccordion;