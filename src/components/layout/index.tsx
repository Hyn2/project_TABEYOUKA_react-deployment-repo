import type { IProps } from "../../types/common.interface"
import Body from "./body"
import Header from "./header"

// interface Props extends IProps {

// }

const Layout = ({children} : IProps) => {
    return(
        <>
          <Header />
          <Body >
            {children}
          </Body>
        </>
    )
}

export default Layout