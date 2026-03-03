const buildComplaintQuery = (baseQuery, filters) => {
  const { status, priority, category, department } = filters;
  const query = { ...baseQuery };

  if (status && status !== 'all') {
    if (status === 'delayed') {
      query.status = { $nin: ['resolved', 'closed'] };
      query.dueDate = { $lt: new Date() };
    } else {
      query.status = status;
    }
  }

  if (priority && priority !== 'all') {
    query.severity = priority.toLowerCase();
  }

  if (category && category !== 'all') {
    query.category = category;
  }

  if (department && department !== 'all') {
    query.department = department;
  }

  return query;
};

const getPaginationParams = (page = 1, limit = 20) => {
  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);
  const skip = (pageNum - 1) * limitNum;

  return { skip, limit: limitNum, page: pageNum };
};

const buildPaginatedResponse = (data, total, page, limit) => {
  return {
    [Array.isArray(data) ? 'data' : 'items']: data,
    currentPage: parseInt(page),
    totalPages: Math.ceil(total / limit),
    total,
  };
};

module.exports = {
  buildComplaintQuery,
  getPaginationParams,
  buildPaginatedResponse,
};
