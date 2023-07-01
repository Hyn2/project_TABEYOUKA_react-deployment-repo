import type { IProps } from "../../types/common.interface"
import Body from "./body"

// interface Props extends IProps {

// }

const Layout = ({children} : IProps) => {
    return(
        <>
          <Body >
            {children}
          </Body>
        </>
    )
}

export default Layout