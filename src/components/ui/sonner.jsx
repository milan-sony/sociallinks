import { Toaster as Sonner } from 'sonner'

function Toaster({ dark, ...props }) {
  return (
    <Sonner
      theme={dark ? 'dark' : 'light'}
      position="bottom-center"
      toastOptions={{
        classNames: {
          toast: '!bg-popover !text-popover-foreground !border-0 !rounded-xl !font-sans !shadow-lg',
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
