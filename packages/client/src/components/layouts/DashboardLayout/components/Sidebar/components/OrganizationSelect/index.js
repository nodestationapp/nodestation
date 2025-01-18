import "./styles.scss";

const mainClass = "dashboard-layout__organization-select";

const OrganizationSelect = () => {
  // const formatted_organizations = organizations?.filter(
  //   (item) => item?.id !== organization?.id
  // );

  return (
    <div className={mainClass}>
      <div className={`${mainClass}__current`}></div>
      <div className={`${mainClass}__separator`} />
      <div className={`${mainClass}__list`}></div>
    </div>
  );
};

export default OrganizationSelect;
