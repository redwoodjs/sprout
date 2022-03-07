import { useAuth } from '@redwoodjs/auth'
import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

type AdminLayoutProps = {
  children?: React.ReactNode
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const { logOut, hasRole } = useAuth()

  return (
    <div className={'flex flex-row'}>
      <Toaster />
      <ul className={'w-64 p-4'}>
        {hasRole(['editor', 'admin']) && (
          <>
            <li>
              <Link to={routes.showcases()}>Showcases</Link>
            </li>
            <li>
              <Link to={routes.authors()}>Authors</Link>
            </li>
            <li>
              <Link to={routes.tags()}>Tags</Link>
            </li>
            <li>
              <Link to={routes.medias()}>Medias</Link>
            </li>
          </>
        )}
        {hasRole('admin') && (
          <li>
            <Link to={routes.users()}>Users</Link>
          </li>
        )}
        {hasRole(['editor', 'admin', 'translator']) && (
          <li>
            <Link to={routes.showcaseLocalizations()}>Localizations</Link>
          </li>
        )}
        <li>
          <button
            onClick={() => {
              logOut()
            }}
          >
            -&gt; Log out
          </button>
        </li>
      </ul>
      <main className={'flex flex-row ml-4 w-full'}>{children}</main>
    </div>
  )
}

export default AdminLayout
