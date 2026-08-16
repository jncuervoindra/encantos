import styled from 'styled-components'

const Track = styled.button`
  position: relative;
  width: 40px;
  height: 22px;
  padding: 0;
  border: none;
  border-radius: 999px;
  background: ${({ $checked }) => ($checked ? 'var(--color-accent)' : 'var(--color-border)')};
  cursor: pointer;
  transition: background-color 120ms ease;

  &:disabled {
    opacity: 0.55;
    cursor: default;
  }
`

const Knob = styled.span`
  position: absolute;
  top: 2px;
  left: 2px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #fff;
  transition: transform 120ms ease;
  transform: ${({ $checked }) => ($checked ? 'translateX(18px)' : 'translateX(0)')};
`

function Switch({ checked, onChange, disabled = false, label = 'Cambiar estado' }) {
  return (
    <Track
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      $checked={checked}
      onClick={() => onChange(!checked)}
    >
      <Knob $checked={checked} />
    </Track>
  )
}

export default Switch
