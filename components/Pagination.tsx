import IconLeft from "./IconLeft";
import IconRight from "./IconRight";

type Props = {
  currentPage: number;
  handleGetPages: (page: number) => Promise<void>;
};

const Pagination = ({ currentPage, handleGetPages }: Props) => {
  return (
    <div className="pagination flex justify-end mt-5">
      {currentPage == 1 ? (
        ""
      ) : (
        <button
          type="button"
          className="btn-arrow mx-1"
          onClick={() => handleGetPages(currentPage - 1)}
        >
          <IconLeft />
        </button>
      )}

      {currentPage == 1 ? (
        ""
      ) : (
        <button
          className="btn-page mx-1"
          onClick={() => handleGetPages(currentPage - 1)}
        >
          {currentPage - 1}
        </button>
      )}

      <button
        className={
          currentPage == currentPage ? "active-page mx-1" : "btn-page mx-1"
        }
        onClick={() => handleGetPages(currentPage)}
      >
        {currentPage}
      </button>
      <button
        className="btn-page mx-1"
        onClick={() => handleGetPages(currentPage + 1)}
      >
        {currentPage + 1}
      </button>
      <button
        type="button"
        className="btn-arrow mx-1"
        onClick={() => handleGetPages(currentPage + 1)}
      >
        <IconRight />
      </button>
    </div>
  );
};

export default Pagination;
