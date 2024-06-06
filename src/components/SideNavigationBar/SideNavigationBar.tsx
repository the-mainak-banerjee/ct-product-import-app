import { ReactNode, useState } from 'react';
import styles from './SideNavigationBar.module.css';
import { useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';
import CollapsedSideNavigationItem from '../CollapsedSideNavigationItem/CollapsedSideNavigationItem';
import IconButton from '@commercetools-uikit/icon-button';
import {
  SidebarCollapseIcon,
  SidebarExpandIcon,
  WorldIcon,
  UserLinearIcon,
  InformationIcon,
} from '@commercetools-uikit/icons';
export interface INavigationItem {
  title: string;
  subMenu: { title: string; href: string }[];
}

export const mockNavigationItems: INavigationItem[] = [
  {
    title: 'Import/Export',
    subMenu: [
      {
        title: 'Product Import',
        href: '/product-import',
      },
      {
        title: 'Price Import',
        href: '/price-import',
      },
    ],
  },
  {
    title: 'Seo',
    subMenu: [
      {
        title: 'Redirects',
        href: '/redirects',
      },
    ],
  },
  {
    title: 'Admin',
    subMenu: [
      {
        title: 'Sync Jobs',
        href: '/sync-jobs',
      },
    ],
  },
];
const getNavigationIcon = (navItemTitle: string) => {
  switch (navItemTitle) {
    case 'Import/Export':
      return InformationIcon;

    case 'Seo':
      return WorldIcon;

    case 'Admin':
      return UserLinearIcon;
    default:
      return InformationIcon;
  }
};

const SideNavigationBar = ({ children }: { children: ReactNode }) => {
  const match = useRouteMatch();
  const [isNavbarCollapsed, setIsNavbarCollapsed] = useState(true);
  return (
    <div>
      <div className={styles.container}>
        <div
          className={`${styles.navigationContainer} ${
            isNavbarCollapsed
              ? styles.collapsedNavigationContainer
              : styles.nonCollapsedNavigationContainer
          }`}
        >
          <div className={isNavbarCollapsed ? '' : styles.collapseIcon}>
            <IconButton
              icon={
                isNavbarCollapsed ? (
                  <SidebarExpandIcon />
                ) : (
                  <SidebarCollapseIcon />
                )
              }
              label="Sidebar Collapse Icon"
              onClick={() => setIsNavbarCollapsed((prevState) => !prevState)}
            />
          </div>
          {isNavbarCollapsed
            ? mockNavigationItems.map((item) => {
                const Icon = getNavigationIcon(item.title);
                return (
                  <div key={item.title}>
                    <CollapsedSideNavigationItem
                      subMenu={item.subMenu}
                      icon={<Icon />}
                    />
                  </div>
                );
              })
            : mockNavigationItems.map((item) => {
                return (
                  <div key={item.title} className={styles.menuItem}>
                    <h5 className={styles.title}>{item.title}</h5>
                    <div className={styles.subMenuList}>
                      {item.subMenu?.map((subMenu) => {
                        return (
                          <Link
                            to={`${match.url}${subMenu.href}`}
                            key={subMenu.href}
                            className={styles.subMenuItem}
                          >
                            {subMenu.title}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
        </div>
        <section
          className={`${styles.sectionContainer} ${
            isNavbarCollapsed ? styles.sectionContainerCollapsed : ''
          }`}
        >
          {children}
        </section>
      </div>
    </div>
  );
};

export default SideNavigationBar;
