import clsx from "clsx";
import {forwardRef} from 'react';

import styles from './ColumnStyle.module.scss';

function Column(
    {
        children,
        spacing = "10px",
        className,
        itemClassName,
        ...props
    }, ref) {
    return (
        <div
            ref={ref}
            className={clsx(styles.column_component, className)}
            style={{"--spacing": spacing}}
        >
            {children.map((child, index) => (
                <div
                    key={child.key ?? index}
                    className={clsx(styles.column_item, itemClassName, {
                        [styles.first_item]: index === 0,
                        [styles.last_item]: index === children.length - 1
                    })}
                >
                    {child}
                </div>
            ))}
        </div>
    );
}

export default forwardRef(Column);
