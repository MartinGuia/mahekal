// interface Props extends React.InputHTMLAttributes<HTMLInputElement>{}

export function Title(props) {
  return (
    <main className="flex justify-center select-none">
        <div className="flex flex-col mt-2">
          <h1  {...props} className="text-mahekal-brown font-medium text-4xl text-center duration-0 max-[450px]:text-2xl max-[282px]:text-xl"/>
          <hr className="w-auto mt-1.5 border-mahekal-brown duration-0" />
        </div>
      </main>
  )
}
