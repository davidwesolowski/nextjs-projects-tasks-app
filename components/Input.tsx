import clsx from 'clsx'

export const Input = ({ className, ...rest }) => {
    return <input className={clsx('border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full', className)} {...rest} />
}