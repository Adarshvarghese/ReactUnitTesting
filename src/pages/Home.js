import CommonNav from "../components/CommonNav"
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Search from "../components/Search";

const Home=()=>{


  return(
<>
<CommonNav/>

<Box component="main" sx={{ p: 3 }}>
        <Toolbar />
        <Typography>
        Welcome to the world of EVO Bank! Here, you'll find everything you need to know about our esteemed financial institution.

Our vision at EVO Bank is to empower financial inclusion and promote economic growth by providing comprehensive and accessible banking services to our diverse clientele. Our dedicated team of professionals is committed to ensuring the highest standards of service and financial integrity.

EVO Bank was established in [year] and has since expanded its presence across multiple regions in India. Our network of branches and ATMs enables us to cater to the financial needs of millions of individuals and businesses alike.

Our banking services include:

Savings Accounts: With an array of savings account options, you can choose the one that best suits your financial goals and preferences. Our interest rates are competitive, and we offer various benefits, such as tax savings and complimentary access to our digital banking platform.

Current Accounts: EVO Bank's current accounts offer a convenient and secure way to manage your daily transactions. You can enjoy round-the-clock access to your account through our digital banking platform, and enjoy the benefits of online bill payment, and other advanced features.

Deposit Products: EVO Bank provides a range of fixed deposit schemes that cater to various investment needs and preferences. Our fixed deposit products offer competitive interest rates and provide the security of government backing.

Loan Products: EVO Bank is committed to helping its customers fulfill their financial goals by offering a comprehensive suite of loan products. These include personal loans, home loans, and business loans, each tailored to cater to specific financial needs.

Wealth Management Services: EVO Bank offers a wide array of wealth management services to help you build, preserve, and manage your wealth effectively. These services include investment advisory, portfolio management, and insurance solutions.

At EVO Bank, we take pride in our commitment to providing exceptional service and value to our customers. We are constantly striving to innovate and enhance our services to better meet the evolving needs of our dynamic clientele.

Please feel free to explore our website and learn more about the services we offer. If you have any questions
        </Typography>
      </Box>

</>
  )
}
export default Home