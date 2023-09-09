export class APIFeatures {
  query: any;
  queryString: any;
  searchKey?: string;
  constructor(query, queryString, searchKey) {
    this.query = query;
    this.queryString = queryString;
    this.searchKey = searchKey;
  }

  // category() {
  //   if (this.queryString.category) {
  //     const filtered = {
  //       metadata: {
  //         $elemMatch: {
  //           "category.category": this.queryString.category,
  //         },
  //       },
  //     };
  //     this.query = this.query.find(filtered);
  //   }
  //   return this;
  // }

  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ["page", "sort", "limit", "fields", "search"];

    excludedFields.forEach((el) => delete queryObj[el]);

    // 1B) ADVANCED FILTERING

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(lt|lte|gt|gte)\b/g, (match) => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  search() {
    if (this.queryString.search) {
      console.log("hello");

      this.query = this.query.find({
        [this?.searchKey!]: { $regex: this.queryString.search },
      });
    }
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      console.log(sortBy, "sortby");

      this.query = this.query.sort(sortBy);
    }
    // else {
    //   this.query = this.query.sort({ createdAt: -1 });
    // }
    return this;
  }

  limitFields() {
    // 3) LIMITING FIELDS
    if (this.queryString.fields) {
      // const fields = x;
      const fields = this.queryString.fields.split(",").join(" ");
      this.query = this.query.select(fields + " -__v");
      console.log(fields, "names");
    } else {
      this.query = this.query.select("-__v");
    }
    return this;
  }

  pagination() {
    // 4) PAGINATION
    const page = Number(this.queryString.page) * 1 || 1;
    const limit = Number(this.queryString.limit) * 1 || 100;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    //actually this code is not that important because requesting a next page which has zero result is not a error.
    //no results is enough for the user to understand that there is no data on last page
    // if (this.queryString.page) {
    //   const numTours = this.query.countDocuments(); //return length
    //   if (skip >= numTours) throw new Error('This page does not exist');
    // }
    return this;
  }
}
