import { FiChevronDown, FiChevronUp, FiLogOut, FiMenu, FiSettings, FiX } from 'react-icons/fi'
import { SidebarSubitemProps } from '../sidebar-subitem/SidebarSubitem'
import { SidebarItem } from '../sidebar-item/SidebarItem'
import { JSX, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { t } from 'i18next'
import styles from './sidebar.module.scss'
import clsx from 'clsx'

export type SidebarProps = {
  items: {
    name: string
    icon: JSX.Element
    path: string
    subitems?: SidebarSubitemProps[] | undefined
  }[]
}

export function Sidebar(props: SidebarProps) {
  const { items } = props
  const [expanded, setExpanded] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)

  const itemsPerPage = 7
  const totalPages = Math.ceil(items.length / itemsPerPage)
  const startIndex = currentPage * itemsPerPage
  const visibleItems = items.slice(startIndex, startIndex + itemsPerPage)

  return (
    <>
      <div
        className={clsx(styles['sidebar'], {
          [styles['collapsed']]: !expanded,
        })}
      >
        <div className={styles['top']}>
          <span
            className={styles['icon-top']}
            onClick={() => setExpanded(!expanded)}
          >
            <FiMenu style={{ display: 'flex' }} size={20} />
          </span>
          <p className={styles['text-top']}>{t('aetherdex')}</p>
          <span
            className={styles['close-top']}
            onClick={() => setExpanded(false)}
          >
            <FiX style={{ display: 'flex' }} size={20} />
          </span>
        </div>
        <div className={clsx(styles['pagination'], {
          [styles['disabled']]: currentPage === 0
        })}
          onClick={() => currentPage > 0 && setCurrentPage((prev) => prev - 1)}
        >
          <FiChevronUp size={20} />
        </div>
        <div className={styles['menu']}>
          {visibleItems.map((item, index) => (
            <SidebarItem
              key={index}
              name={item.name}
              icon={item.icon}
              path={item.path}
              subitems={item.subitems}
              expanded={expanded}
            />
          ))}
        </div>
        <div className={clsx(styles['pagination'], {
          [styles['disabled']]: currentPage >= totalPages - 1
        })}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          <FiChevronDown size={20} />
        </div>
        <div className={styles['bottom']}>
          <SidebarItem
            name={t('settings')}
            icon={<FiSettings />}
            path="settings"
            expanded={expanded}
            subitems={undefined}
          />
          <SidebarItem
            name={t('logout')}
            icon={<FiLogOut />}
            path=""
            expanded={expanded}
            subitems={undefined}
          />
        </div>
      </div>
      <div className={clsx(styles['content'], {
        [styles['collapsed']]: !expanded,
      })}>
        <Outlet />
      </div>
    </>
  )
}
