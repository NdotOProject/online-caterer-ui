import clsx from "clsx";
import {forwardRef} from 'react';

import styles from './RowStyle.module.scss';

function Row(
    {
        children = [],
        spacing = "10px",
        style,
        className,
        itemClassName,
        ...props
    }, ref) {
    if (!Array.isArray(children)) {
        children = [children];
    }

    const componentStyle = {
        "--spacing": spacing,
        ...style
    };

    return (
        <div
            ref={ref}
            className={clsx(styles.row_component, className)}
            style={componentStyle}
        >
            {children.map((child, index) => {
                return (
                    <div
                        key={child.key ?? index}
                        className={clsx(styles.row_item, itemClassName, {
                            [styles.first_item]: index === 0,
                            [styles.last_item]: index === children.length - 1
                        })}
                    >
                        {child}
                    </div>
                );
            })}
        </div>
    );
}

export default forwardRef(Row);
