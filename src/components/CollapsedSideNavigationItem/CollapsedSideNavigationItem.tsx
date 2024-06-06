import styles from './CollapsedSideNavigationItem.module.css';
import IconButton from '@commercetools-uikit/icon-button';
import { ReactElement, useState } from 'react';
import { INavigationItem } from '../SideNavigationBar/SideNavigationBar';
import { useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';

const CollapsedSideNavigationItem = ({
  subMenu,
  icon,
}: {
  subMenu: INavigationItem['subMenu'];
  icon: ReactElement;
}) => {
  const match = useRouteMatch();
  console.log('🚀 ~ match:', match);
  const [displayNavItems, setDisplayNavItems] = useState(false);
  return (
    <div
      className={styles.container}
      onMouseEnter={() => setDisplayNavItems(true)}
      onMouseLeave={() => setDisplayNavItems(false)}
    >
      <IconButton icon={icon} label="A label text" />
      {displayNavItems && (
        <div className={styles.listItems}>
          {subMenu.map((item) => {
            return (
              <Link
                to={`${match.url}${item.href}`}
                key={item.href}
                className={styles.subMenuItem}
              >
                {item.title}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CollapsedSideNavigationItem;
