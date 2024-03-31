
const Pagination = ({ data, handleNavigate }) => {
  if (!data?.meta?.links) {
    return null;
  }

  return (
    <nav
      className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px mt-4"
      aria-label="Pagination"
    >
      {data.meta.links.map((link, index) => {
        if (!link.url) return null;

        const pageMatch = link.url.match(/page=(\d+)/);
        const page = pageMatch ? pageMatch[1] : null;

        let displayLabel = link.label;
        let onClickHandler = () => page && handleNavigate(page);

        if (link.label.includes("Previous")) {
          displayLabel = "Previous";
          const previousPage = index > 0 && page ? parseInt(page, 10) - 1 : null;
          onClickHandler = () => previousPage && handleNavigate(previousPage.toString());
        } else if (link.label.includes("Next")) {
          displayLabel = "Next";
          const nextPage = index < data.meta.links.length - 1 && page ? parseInt(page, 10) + 1 : null;
          onClickHandler = () => nextPage && handleNavigate(nextPage.toString());
        }

        const isActive = link.active
          ? "z-10 bg-indigo-50 border-indigo-500 text-indigo-600 dark:bg-indigo-700 dark:text-white dark:border-indigo-500"
          : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:border-gray-700";
        const isDisabled = !link.url ? "cursor-not-allowed" : "";

        return (
          <div
            key={index}
            onClick={onClickHandler}
            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium cursor-pointer ${isActive} ${isDisabled}`}
          >
            {displayLabel}
          </div>
        );
      })}
    </nav>
  );
};

export default Pagination;
