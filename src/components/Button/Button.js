import './Button.scss';

const Button = ({className = "", children, type = "",onClick}) => {

	return(
		<button
			type={type} 
			className={`action-btn ${className}`}
			onClick={onClick}>
				{children ? children : null}
		</button>
	)
}

export default Button;