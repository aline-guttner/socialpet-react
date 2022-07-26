import style from './Button.module.scss'

interface Props {
    children?: React.ReactNode,
    type?: "button" | "submit" | "reset" | undefined,
    onClick?: () => void
}

function Button({ onClick, type, children }: Props) {
    return (
        <button type={type} onClick={onClick} className={style.cadastroButton}>
            {children}
        </button>
    )
}

export default Button;