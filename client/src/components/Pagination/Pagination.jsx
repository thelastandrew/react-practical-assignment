import { connect } from 'react-redux';
import { useState } from 'react';
import { getPosts } from '../../store/postsReducer';
import s from './Pagination.module.css';
import { useEffect } from 'react';

const Pagination = (props) => {
  const [isPrevActive, setIsPrevActive] = useState(false);
  const [isNextActive, setIsNextActive] = useState(false);

  useEffect(() => {
    setIsPrevActive(props.page > 1);
    setIsNextActive(props.page < props.totalPages);
  }, [props.page, props.totalPages]);

  const handlePrev = () => {
    const desiredPage = props.page - 1;
    if (desiredPage === 1) setIsPrevActive(false);
    if (props.page === props.totalPages) setIsNextActive(true);
    props.getPosts(desiredPage);
  };

  const handleNext = () => {
    const desiredPage = props.page + 1;
    if (desiredPage === props.totalPages) setIsNextActive(false);
    if (props.page === 1) setIsPrevActive(true);
    props.getPosts(desiredPage);
  };

  return (
    <div className={s.pagination}>
      <button
        onClick={handlePrev}
        disabled={!isPrevActive}
      >&lt;</button>
      <p className={s.currentPage}>{props.page}</p>
      <button
        onClick={handleNext}
        disabled={!isNextActive}
      >&gt;</button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  page: state.posts.page,
  totalPages: state.posts.totalPages,
});

export default connect(mapStateToProps, { getPosts })(Pagination);