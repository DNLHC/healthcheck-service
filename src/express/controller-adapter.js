export default function createControllerAdapter(controller) {
  return async function (req, res, next) {
    const httpRequset = {
      body: req.body,
      query: req.query,
      params: req.params,
      ip: req.ip,
      method: req.method,
      path: req.path,
      headers: {
        'Content-Type': req.get('Content-Type'),
        Referer: req.get('referer'),
        'User-Agent': req.get('User-Agent'),
      },
    };

    try {
      const response = await controller(httpRequset);

      const headers = {
        'Content-Type': 'application/json',
      };

      res.set({ ...headers, ...response.headers });

      res
        .type('json')
        .status(response.statusCode)
        .send({ success: true, data: response.body });
    } catch (error) {
      next(error);
    }
  };
}
