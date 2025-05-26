// import { Fragment } from "react";
// import Container from "@components/common/container";
// import GradientHeader from "./gradientHeader";
// import { ProposalContainer, ProposalRow } from "./proposalCard";
// import { Panel } from "./dashboard";
// import Navigation from "./navigation_component";
// import Search from "./search";
// import { Header } from "./header";
// import {
//   ProposalDetailsContainer,
//   InfoCard,
//   CollapsibleInfoCard
// } from "./proposal_details";
// import { ProposalButton } from "./proposalbutton";
// import { NavigationContainer } from "./navigation_container";
// import NavigationWithAddModelContainer from './NavigationWithAddModelContainer';
// import AddModelButton from './AddModelButton';
// import {SidebarContainer} from './sidebaarContainer';
// import { BoxContainer } from "./boxContainer";
// import { PageHeading } from "./pageHeading";
// import {ProposalJsonModal} from './proposaldatamodal'; 

// const widgetsMap = {
//   fragment: Fragment,
//   // box_container: Container,
//   gradient_header: GradientHeader,
//   proposal_container: ProposalContainer,
//   proposal_row: ProposalRow,
//   panel: Panel,
//   header: Header,
//   navigation: Navigation,
//   search: Search,
//   proposal_details_container: ProposalDetailsContainer,
//   info_card: InfoCard,
//   collapsible_info_card: CollapsibleInfoCard,
//   proposal_button: ProposalButton,
//   navigation_container: NavigationContainer,
//   navigation_with_add_model_container: NavigationWithAddModelContainer,
//   add_model_button: AddModelButton,
//   sidebaar_container:SidebarContainer,
//   box_container: BoxContainer,
//   page_heading: PageHeading,
//   proposal_json_modal: ProposalJsonModal
// };

// export default widgetsMap;

import { Fragment } from "react";
import Container from "@components/common/container";
import { Header } from "./header";
import Navigation from "./navigation_component";
import { NavigationContainer } from "./navigation_container";
import { SidebarContainer } from "./sidebaarContainer";
import BoxContainer  from "./boxContainer";
import { Table } from "./default_table";
import { AddModelForm } from "./AddModelForm";
import { ConfigureNewModel } from "./ConfigureNewModel";
import { ProposalJsonModal } from "./proposaldatamodal";
import { PageHeading } from "./pageHeading";
import { AddModelButton } from "./AddModelButton";
import FlexContainer from "./flexContainer"; 
import { ToolbarContainer } from "@components/TableToolbar/styles";
import { TableContent } from "@components/TableContent";
import { TableToolbar } from "@components/TableToolbar";
import { TablePagination } from "@components/TablePagination";

const widgetsMap = {
  fragment: Fragment,
  header: Header,
  flex_container: FlexContainer,
  sidebaar_container: SidebarContainer,
  navigation_container: NavigationContainer,
  navigation: Navigation,
  box_container: BoxContainer,
  default_table: Table,
  add_model_form: AddModelForm,
  configure_new_model: ConfigureNewModel,
  proposal_json_modal: ProposalJsonModal,
  page_heading: PageHeading,
  add_model_button: AddModelButton,
  toolbar: TableToolbar,
  table_content: TableContent,
  pagination: TablePagination
};

export default widgetsMap;