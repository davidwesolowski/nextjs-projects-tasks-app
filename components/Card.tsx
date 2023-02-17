import clsx from 'clsx'

export const Card = ({ children, className }) => {
    return <div className={clsx('rounded-3xl px-10 py-4 drop-shadow-xl bg-white', className)}>
        {children }
    </div>
}