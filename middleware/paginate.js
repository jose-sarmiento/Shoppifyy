import mongoose from 'mongoose';

const paginate = (model) => {
   return async (req, res, next) => {
      const { keyword, sort, limit, page } = req.query;
      
      let query = {};
      const response = {};

      const pageNumber = Number(page) || 1;
      const pageSize = Number(limit) || 8;
      const startIndex = (pageNumber - 1) * pageSize;
      const endIndex = pageNumber * pageSize;

      if(keyword) {
         query = {
            name: {
               $regex: keyword,
               $options: 'i'
             }
         }
      }

      //sorting
      let result = model.find(query);
      if (sort) {
         const sortFormatted = sort.split(',').join(' ');
         result = result.sort(sortFormatted);
      } else {
         result = result.sort('createdAt');
      }

      // pagination
      if (page) result = result.skip(startIndex);
      if (limit) result = result.limit(pageSize);

      response.docs = await result
         .sort({ createdAt: -1 })
         .populate('user', 'name');
      response.nbDocs = response.docs.length;

      if (endIndex < (await model.countDocuments().exec())) {
         response.next = {
            page: pageNumber + 1,
            limit: pageSize,
         };
      }

      if (startIndex > 0) {
         response.previous = {
            page: pageNumber - 1,
            limit: pageSize,
         };
      }
      res.paginatedResults = response;

      next();
   };
};

export default paginate;
